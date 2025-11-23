export async function useJson(path) {
  if (process.client) {
    const { data, error } = await useFetch(`/content/${path}`)
    if (error.value) throw error.value
    return data.value
  } else {
    const fs = await import('node:fs/promises')
    const json = await fs.readFile(`./public/content/${path}`, 'utf-8')
    return JSON.parse(json)
  }
}
