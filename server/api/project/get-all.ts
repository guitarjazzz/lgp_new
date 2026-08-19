import fs from 'node:fs/promises'
import { getRunningProjectLink } from '../../utils/project-process'
import { getProjectPath, getProjectsRoot } from '../../utils/project-paths'

export default defineEventHandler(async (event) => {
  const folderPath = getProjectsRoot()
  const entries = await fs.readdir(folderPath, {withFileTypes: true})
  const folders = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)

  return Promise.all(folders.map(async (name) => ({
    name,
    link: await getRunningProjectLink(getProjectPath(name))
  })))
});