import { createReadStream, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { createInterface } from 'readline'
import JsonToTS from 'json-to-ts'
async function createFile(_reload = false) {
  const nowDate = Date.now()
  const tsPath = 'src/modules/translate/interfaces'
  // rmSync(tsPath, { recursive: true, force: true })

  if (!existsSync(tsPath))
    mkdirSync(tsPath)

  const JsonPath = resolve('src/i18n/en/')
  const tsIndexFile = resolve(`${tsPath}/index.ts`)
  // const tsIndexFiles = resolve(tsPath)
  const names: string[] = []

  console.log(tsIndexFile)
  let linesCount = 0
  const rl = createInterface({
    input: createReadStream(tsIndexFile),
    output: process.stdout,
    terminal: false,
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for await (const line of rl)
    linesCount++

  readdirSync(JsonPath).forEach(async (file) => {
    const filePath = `${JsonPath}/${file}`
    const name = file.replace('.json', '')
    const object: string[] = []
    const getFile = readFileSync(filePath, 'utf8')
    const coverJson = JSON.parse(getFile)
    names.push(name)

    if (nowDate - Number(statSync(filePath).mtimeMs.toFixed(0)) < 100 && readdirSync(tsPath).length >= readdirSync(JsonPath).length) {
      console.log('1')

      JsonToTS(coverJson, {
        rootName: name,
      }).forEach((typeInterface) => {
        object.push(typeInterface)
      })
      const datas = object
        .map(int => `export ${int}`)
        .join('\n\n')
        .trim()
      const fileName = file.replace('.json', '.ts')
      writeFileSync(`src/modules/translate/interfaces/${fileName}`, datas)
      console.log('💚 💚 💚 💚 GENERATOR I18N EMAIL 💚 💚 💚 💚 ')
    }
    if (linesCount < names.length) {
      console.log(linesCount, '2', names.length)
      let importStmts = ''
      names.forEach((name) => {
        importStmts += `export type {${name.charAt(0).toUpperCase() + name.slice(1)}} from './${name}'\n`
      })
      writeFileSync('src/modules/translate/interfaces/index.ts',
        importStmts)
      return true
    }
    return true
  })
  return true
}
createFile()
export default createFile
