import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export default defineEventHandler(async () => {
  const configPath = join(process.cwd(), 'app', 'base.conf');
  return JSON.parse(await readFile(configPath, 'utf8'));
});
