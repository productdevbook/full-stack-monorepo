import { execSync } from 'child_process'
import chokidar from 'chokidar'
const file = './graphql/**/**.graphql'
const serverGraphQL = '../../apps/nestjs/schema.graphql'

export function watch() {
  /**
   * TS-GraphQL Graphql Auto Generate
   */

  chokidar.watch(file).on('all', (event, url, stats) => {
    const nowDate = Date.now()
    if (
      (event === 'add'
        && nowDate - Number(stats?.mtimeMs.toFixed(0)) < 10000)
      || event !== 'add'
    ) {
      try {
        const yarnStart = execSync('yarn graphql-ts').toString()
        // eslint-disable-next-line no-console
        console.log('💚 💚 💚 💚 Vue Graphql Generator 💚 💚 💚 💚 ', yarnStart)
      }
      catch (error) {

      }
    }
  })

  /**
   * TS-GraphQL Nestjs Auto Generate
   */
  chokidar.watch(serverGraphQL).on('all', (event, url, stats) => {
    const nowDate = Date.now()
    if (
      (event === 'add'
        && nowDate - Number(stats?.mtimeMs.toFixed(0)) < 10000)
      || event !== 'add'
    ) {
      try {
        const yarnStart = execSync('yarn graphql-ts').toString()
        // eslint-disable-next-line no-console
        console.log(
          '💻 💻 💻 💻 SERVER GRAPHQL CREATING 💻 💻 💻 💻 💻 ',
          yarnStart,
        )
      }
      catch (error) {

      }
    }
  })
}

watch()
export default watch
