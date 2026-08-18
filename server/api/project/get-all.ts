import fs from 'node:fs/promises'
import path from 'node:path'
import { getRunningProjectLink } from '../../utils/project-process'

export default defineEventHandler(async (event) => {
  const folderPath = path.resolve('./projects')
  const entries = await fs.readdir(folderPath, {withFileTypes: true})
  const folders = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)

  return Promise.all(folders.map(async (name) => ({
    name,
    link: await getRunningProjectLink(path.join(folderPath, name))
  })))
});