import { readdir } from 'node:fs/promises';
import { getTemplateComponentsPath } from '../../utils/project-paths';

export default defineEventHandler(async () => {
  const entries = await readdir(getTemplateComponentsPath(), { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.vue'))
    .map((entry) => ({
      name: entry.name.replace(/\.vue$/, ''),
      path: `app/templates/app/components/${entry.name}`
    }));
});
