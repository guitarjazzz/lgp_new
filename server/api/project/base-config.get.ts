import { readFile } from 'node:fs/promises';
import { getBaseConfigPath } from '../../utils/project-paths';

export default defineEventHandler(async () => {
  return JSON.parse(await readFile(getBaseConfigPath(), 'utf8'));
});
