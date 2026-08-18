import { execFile } from 'node:child_process';
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { join } from 'node:path';
import { promisify } from 'node:util';
import { saveProjectProcess, stopProjectProcess } from '../../utils/project-process';

const execFileAsync = promisify(execFile);

const findAvailablePort = () => new Promise<number>((resolve, reject) => {
  const server = createServer();
  server.once('error', reject);
  server.listen(0, '127.0.0.1', () => {
    const address = server.address();
    const port = typeof address === 'object' && address ? address.port : 0;
    server.close((error) => error ? reject(error) : resolve(port));
  });
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name } = body;

  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Project name is required'
    });
  }

  const projectPath = join(process.cwd(), 'projects', name);

  try {
    await stopProjectProcess(projectPath);
    await execFileAsync('npm', ['run', 'build'], {
      cwd: projectPath,
      maxBuffer: 10 * 1024 * 1024
    });

    const port = await findAvailablePort();
    const link = `http://127.0.0.1:${port}`;
    const previewProcess = spawn(process.execPath, ['.output/server/index.mjs'], {
      cwd: projectPath,
      detached: true,
      env: {
        ...process.env,
        HOST: '127.0.0.1',
        PORT: String(port)
      },
      stdio: 'ignore'
    });
    previewProcess.unref();
    await saveProjectProcess(projectPath, previewProcess.pid ?? 0, port);

    return {
      success: true,
      message: `Project built for: ${name}`,
      link
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to build project: ${error}`
    });
  }
});