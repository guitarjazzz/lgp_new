import { spawn } from 'node:child_process';
import { connect, createServer } from 'node:net';
import { join } from 'node:path';
import { saveProjectProcess, stopProjectProcess } from '../../utils/project-process';

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

  try {
    const projectPath = join(process.cwd(), 'projects', name);
    await stopProjectProcess(projectPath);

    const port = await findAvailablePort();
    const link = `http://127.0.0.1:${port}`;
    
    // Run npm run dev for the project asynchronously
    const devProcess = spawn('npm', ['run', 'dev', '--', '--host', '127.0.0.1', '--port', String(port)], {
      cwd: projectPath,
      detached: true,
      stdio: 'ignore'
    });
    devProcess.unref();
    await saveProjectProcess(projectPath, devProcess.pid ?? 0, port);

    return {
      success: true,
      message: `Dev server started for project: ${name}`,
      link
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to start dev server: ${error}`
    });
  }
});
