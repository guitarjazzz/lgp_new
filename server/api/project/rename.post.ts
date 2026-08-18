import { rename } from 'node:fs/promises'
import path from 'node:path'

const isValidProjectName = (name: unknown): name is string =>
  typeof name === 'string' && Boolean(name.trim()) && name !== '.' && name !== '..' && name === name.replace(/[\\/]/g, '')

export default defineEventHandler(async (event) => {
  const body = await readBody<{ oldName?: unknown; newName?: unknown }>(event)
  const oldName = typeof body?.oldName === 'string' ? body.oldName.trim() : ''
  const newName = typeof body?.newName === 'string' ? body.newName.trim() : ''

  if (!isValidProjectName(oldName) || !isValidProjectName(newName)) {
    throw createError({ statusCode: 400, statusMessage: 'Valid old and new project names are required' })
  }

  await rename(
    path.join(process.cwd(), 'projects', oldName),
    path.join(process.cwd(), 'projects', newName)
  )

  return { success: true, message: 'Project renamed successfully', data: { name: newName } }
})