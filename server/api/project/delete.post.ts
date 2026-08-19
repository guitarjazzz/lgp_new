import { removeProjectDirectory, stopProjectProcess } from '../../utils/project-process'
import { getProjectPath } from '../../utils/project-paths'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ name?: unknown }>(event)
  const projectName = typeof body?.name === 'string' ? body.name.trim() : ''

  if (!projectName || projectName === '.' || projectName === '..' || projectName !== projectName.replace(/[\\/]/g, '')) {
    throw createError({ statusCode: 400, statusMessage: 'A valid project name is required' })
  }

  const projectPath = getProjectPath(projectName)
  await stopProjectProcess(projectPath)
  await removeProjectDirectory(projectPath)
  return { success: true, message: 'Project deleted successfully' }
})