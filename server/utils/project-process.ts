import { execFile } from 'node:child_process';
import { readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { promisify } from 'node:util';

const pidFileName = '.lgp-dev.pid';
const execFileAsync = promisify(execFile);
const isIgnorableKillError = (error: any) => error?.code === 'ESRCH' || error?.code === 'EPERM';

const readProjectProcess = async (projectPath: string) => {
  const raw = await readFile(join(projectPath, pidFileName), 'utf8');
  try {
    const parsed = JSON.parse(raw) as { pid?: number; port?: number };
    return { pid: parsed.pid ?? 0, port: parsed.port ?? 0 };
  } catch {
    // Older pid files only contain the plain PID number
    return { pid: Number.parseInt(raw, 10), port: 0 };
  }
};

export const saveProjectProcess = async (projectPath: string, pid: number, port: number) => {
  await writeFile(join(projectPath, pidFileName), JSON.stringify({ pid, port }));
};

export const getRunningProjectLink = async (projectPath: string) => {
  try {
    const { pid, port } = await readProjectProcess(projectPath);
    if (!Number.isInteger(pid) || pid <= 0 || !port) return null;

    process.kill(pid, 0);
    return `http://127.0.0.1:${port}`;
  } catch {
    return null;
  }
};

export const stopProjectProcess = async (projectPath: string) => {
  let pid = 0;

  try {
    ({ pid } = await readProjectProcess(projectPath));
  } catch {
    try {
      const { stdout } = await execFileAsync('ps', ['-axo', 'pid=,command=']);
      const matchingPids = stdout
        .split('\n')
        .map((line) => line.trim().match(/^(\d+)\s+(.+)$/))
        .filter((match): match is RegExpMatchArray => Boolean(match?.[2]?.includes(projectPath)))
        .map((match) => Number.parseInt(match[1] as any, 10))
        .filter((processId) => processId !== process.pid && processId > 0);

      await Promise.all(matchingPids.map((processId) => {
        try {
          process.kill(-processId, 'SIGTERM');
        } catch (error: any) {
          if (!isIgnorableKillError(error)) throw error;
        }
      }));
      return;
    } catch {
      return;
    }
  }

  if (!Number.isInteger(pid) || pid <= 0) return;

  try {
    process.kill(-pid, 'SIGTERM');
  } catch (error: any) {
    if (!isIgnorableKillError(error)) throw error;
  }

  await new Promise((resolve) => setTimeout(resolve, 300));

  try {
    process.kill(-pid, 'SIGKILL');
  } catch (error: any) {
    if (!isIgnorableKillError(error)) throw error;
  }
};

export const removeProjectDirectory = (projectPath: string) => rm(projectPath, {
  recursive: true,
  force: true,
  maxRetries: 10,
  retryDelay: 200
});