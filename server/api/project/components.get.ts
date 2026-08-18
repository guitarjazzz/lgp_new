import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

export default defineEventHandler(async () => {
  const componentsPath = join('app', 'templates', 'app', 'components');
  const entries = await readdir(join(process.cwd(), componentsPath), { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.vue'))
    .map((entry) => ({
      name: entry.name.replace(/\.vue$/, ''),
      path: `${componentsPath}/${entry.name}`
    }));
});
