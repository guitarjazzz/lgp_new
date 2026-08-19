import { spawn } from 'node:child_process';
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { connect, createServer } from 'node:net';
import { join, resolve } from 'node:path';
import { removeProjectDirectory, saveProjectProcess, stopProjectProcess } from '../../utils/project-process';
import { getAppTemplatePath, getBaseConfigPath, getProjectPath, getProjectsRoot } from '../../utils/project-paths';

const runCommand = (command: string, args: string[], cwd: string) => new Promise<void>((resolve, reject) => {
  const child = spawn(command, args, { cwd, stdio: ['ignore', 'pipe', 'pipe'] });
  let errorOutput = '';

  child.stderr.on('data', (chunk) => {
    errorOutput += chunk.toString();
  });
  child.on('error', reject);
  child.on('close', (code) => {
    if (code === 0) {
      resolve();
      return;
    }

    reject(new Error(errorOutput.trim() || `${command} exited with code ${code}`));
  });
});

const findAvailablePort = () => new Promise<number>((resolve, reject) => {
  const server = createServer();
  server.once('error', reject);
  server.listen(0, '127.0.0.1', () => {
    const address = server.address();
    const port = typeof address === 'object' && address ? address.port : 0;
    server.close((error) => error ? reject(error) : resolve(port));
  });
});

const waitForPort = (port: number) => new Promise<void>((resolve, reject) => {
  let attempts = 0;
  const check = () => {
    const socket = connect(port, '127.0.0.1');
    socket.once('connect', () => {
      socket.destroy();
      resolve();
    });
    socket.once('error', () => {
      socket.destroy();
      attempts += 1;
      if (attempts >= 50) {
        reject(new Error('The Nuxt project did not start in time'));
        return;
      }
      setTimeout(check, 200);
    });
  };
  check();
});

type BasePage = { name: string; path: string };
type BaseComponent = { path: string };
type BaseConfig = { defaultTemplate?: string; dependencies?: Record<string, string>; pages: BasePage[]; components?: Record<string, BaseComponent> };

const escapeTemplateText = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const copyTemplateAndGeneratePages = async (projectPath: string, overrides?: Partial<BaseConfig>) => {
  const appTemplatePath = getAppTemplatePath();
  const configPath = getBaseConfigPath();
  const baseConfig = JSON.parse(await readFile(configPath, 'utf8')) as BaseConfig;
  const config: BaseConfig = { ...baseConfig, ...overrides };

  if (!Array.isArray(config.pages)) {
    throw new Error('base.conf must contain a pages array');
  }

  const appPath = join(projectPath, 'app');
  await cp(appTemplatePath, appPath, { recursive: true });
  await writeFile(join(appPath, 'base.conf'), `${JSON.stringify(config, null, 4)}\n`);

  // Remove template components directory to avoid unwanted components
  await rm(join(appPath, 'components'), { recursive: true, force: true });

  // Copy only components specified in base.conf
  if (config.components && typeof config.components === 'object') {
    const allowedRoots = [
      join(process.cwd(), 'app', 'components'),
      join(appTemplatePath, 'components')
    ];
    await mkdir(join(appPath, 'components'), { recursive: true });
    for (const [componentName, componentConfig] of Object.entries(config.components)) {
      if (typeof componentConfig?.path !== 'string') continue;
      if (!/^[A-Za-z0-9_-]+$/.test(componentName)) {
        throw new Error(`Invalid component name: ${componentName}`);
      }

      const sourcePath = resolve(process.cwd(), componentConfig.path);
      if (!allowedRoots.some((root) => sourcePath.startsWith(`${root}/`))) {
        throw new Error(`Invalid component path: ${componentConfig.path}`);
      }

      const destPath = join(appPath, 'components', `${componentName}.vue`);
      await cp(sourcePath, destPath);
    }
  }

  await mkdir(join(appPath, 'assets', 'css'), { recursive: true });
  await writeFile(join(appPath, 'assets', 'css', 'main.css'), '@import "tailwindcss";\n');
  await writeFile(join(projectPath, 'nuxt.config.ts'), `import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  alias: {
    '@': resolve(process.cwd(), 'app'),
    '@global': resolve(process.cwd(), '..', '..')
  },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()]
  }
});
`);

  for (const page of config.pages) {
    if (typeof page?.name !== 'string' || typeof page?.path !== 'string') {
      throw new Error('Each base.conf page must have a name and path');
    }

    const pagePath = page.path.trim();
    const segments = pagePath.split('/').filter(Boolean);
    if (pagePath.includes('\\') || segments.some((segment) => segment === '.' || segment === '..')) {
      throw new Error(`Invalid page path: ${page.path}`);
    }

    const lastSegment = segments.at(-1);
    const isFilePage = Boolean(lastSegment?.includes('[') && !/^\[[^\[\]]+\]$/.test(lastSegment));
    const pageDirectory = join(appPath, 'pages', ...(isFilePage ? segments.slice(0, -1) : segments));
    const pageFile = isFilePage ? `${lastSegment}.vue` : 'index.vue';
    await mkdir(pageDirectory, { recursive: true });
    await writeFile(
      join(pageDirectory, pageFile),
      `<template>\n  <div>${escapeTemplateText(page.name)}</div>\n</template>\n`
    );
  }

  return Object.entries(config.dependencies ?? {}).map(([name, version]) => {
    if (!/^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(name) || !/^[A-Za-z0-9.^~><=|\s*+-]+$/.test(String(version))) {
      throw new Error(`Invalid dependency: ${name}`);
    }
    return `${name}@${version}`;
  });
};

export default defineEventHandler(async (event) => {
  const body = await readBody<{ name?: unknown; config?: unknown }>(event);
  const projectName = typeof body?.name === 'string' ? body.name.trim() : '';
  const configOverrides = body?.config && typeof body.config === 'object'
    ? body.config as Partial<BaseConfig>
    : undefined;

  if (!projectName || projectName === '.' || projectName === '..' || projectName !== projectName.replace(/[\\/]/g, '')) {
    throw createError({
      statusCode: 400,
      statusMessage: 'A valid project name is required'
    });
  }

  const projectPath = getProjectPath(projectName);
  await mkdir(getProjectsRoot(), { recursive: true });

  try {
    await mkdir(projectPath);
  } catch (error: any) {
    if (error?.code === 'EEXIST') {
      throw createError({ statusCode: 409, statusMessage: 'A project with this name already exists' });
    }
    throw error;
  }

  let devServer: ReturnType<typeof spawn> | undefined;

  try {
    const nuxiPath = join(process.cwd(), 'node_modules', '@nuxt', 'cli', 'bin', 'nuxi.mjs');
    await runCommand(process.execPath, [nuxiPath, 'init', '.', '--template', 'minimal', '--gitInit', '--force', '--no-install', '--packageManager', 'npm'], projectPath);
    const dependencyArgs = await copyTemplateAndGeneratePages(projectPath, configOverrides);
    await runCommand('npm', ['install', ...dependencyArgs], projectPath);

    const port = await findAvailablePort();
    devServer = spawn('npm', ['run', 'dev', '--', '--host', '127.0.0.1', '--port', String(port)], {
      cwd: projectPath,
      detached: true,
      stdio: 'ignore'
    });
    devServer.unref();
    await saveProjectProcess(projectPath, devServer.pid ?? 0, port);
    await waitForPort(port);

    return {
      success: true,
      message: 'Project created and started successfully',
      data: { name: projectName, link: `http://127.0.0.1:${port}` }
    };
  } catch (error) {
    devServer?.kill();
    await stopProjectProcess(projectPath);
    await removeProjectDirectory(projectPath);
    throw createError({
      statusCode: 500,
      statusMessage: error instanceof Error ? error.message : 'Project creation failed'
    });
  }
});