import { resolve } from 'path'
import chokidar from 'chokidar'
import createFile from './index'
const file = 'src/i18n/**/*.json'
export async function watchFile() {
  const path = resolve(file)
  /**
   * TS-GraphQL Graphql Auto Generate
   */

  chokidar.watch(path).on('all', (event, url, stats) => {
    const nowDate = Date.now()
    if (
      (event === 'add'
        && nowDate - Number(stats?.mtimeMs.toFixed(0)) < 10000)
      || event !== 'add'
    )
      createFile(true)
  })
}

watchFile()
export default watchFile
