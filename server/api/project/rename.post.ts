import { rename } from 'node:fs/promises'
import { stopProjectProcess } from '../../utils/project-process'
import { getProjectPath } from '../../utils/project-paths'

const isValidProjectName = (name: unknown): name is string =>
  typeof name === 'string' && Boolean(name.trim()) && name !== '.' && name !== '..' && name === name.replace(/[\\/]/g, '')

export default defineEventHandler(async (event) => {
  const body = await readBody<{ oldName?: unknown; newName?: unknown }>(event)
  const oldName = typeof body?.oldName === 'string' ? body.oldName.trim() : ''
  const newName = typeof body?.newName === 'string' ? body.newName.trim() : ''

  if (!isValidProjectName(oldName) || !isValidProjectName(newName)) {
    throw createError({ statusCode: 400, statusMessage: 'Valid old and new project names are required' })
  }

  const oldProjectPath = getProjectPath(oldName)
  const newProjectPath = getProjectPath(newName)

  await stopProjectProcess(oldProjectPath)
  await rename(oldProjectPath, newProjectPath)

  return { success: true, message: 'Project renamed successfully', data: { name: newName } }
})