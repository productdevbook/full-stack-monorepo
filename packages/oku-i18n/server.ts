import fs from 'fs'
import path, { resolve } from 'path'
import chokidar from 'chokidar'
const file = './src/locales/*.json'
const web = createFile('vue-web')
const app = createFile('vue-mobile')
export function watch() {
  chokidar.watch(file).on('all', (event, url) => {
    const basaname = path.basename(url)
    if (event === 'unlink') {
      fs.unlink(resolve(web, basaname), (err) => {
        if (err)
          throw err
      })
    }
    else {
      fs.writeFileSync(resolve(web, basaname), fs.readFileSync(url))
      fs.writeFileSync(resolve(app, basaname), fs.readFileSync(url))
      // eslint-disable-next-line no-console
      console.log('Create TS I18n ✅')
    }
  })
}

function createFile(name: 'vue-web' | 'vue-mobile') {
  return resolve('../..', 'apps', name, 'locales')
}
watch()
export default watch
