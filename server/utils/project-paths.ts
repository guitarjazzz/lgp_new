import { existsSync } from 'node:fs';
import { join } from 'node:path';

const getRuntimeRoot = () => {
  if (process.env.LGP_ROOT_DIR) return process.env.LGP_ROOT_DIR;

  const workingRoot = process.cwd();
  return existsSync(join(workingRoot, 'projects')) || existsSync(join(workingRoot, 'app', 'base.conf'))
    ? workingRoot
    : join(workingRoot, 'runtime-data');
};

export const getProjectsRoot = () => join(getRuntimeRoot(), 'projects');
export const getBaseConfigPath = () => join(getRuntimeRoot(), 'app', 'base.conf');
export const getAppTemplatePath = () => join(getRuntimeRoot(), 'app', 'templates', 'app');
export const getTemplateComponentsPath = () => join(getAppTemplatePath(), 'components');
export const getProjectPath = (name: string) => join(getProjectsRoot(), name);