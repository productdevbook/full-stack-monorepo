/*
|-------------------------------------------------------------------------------
| Production config           https://maizzle.com/docs/environments/#production
|-------------------------------------------------------------------------------
|
| This is where you define settings that optimize your emails for production.
| These will be merged on top of the base config.js, so you only need to
| specify the options that are changing.
|
*/

const variables = new Set()

module.exports = {
  build: {
    templates: {
      source: 'src/templates',
      destination: {
        path: '../nestjs/email',
        extension: 'hbs',
      },
      assets: {
        destination: 'public/maizzle',
      },
    },
  },
  baseImageURL: 'https://appname.com',
  inlineCSS: true,
  prettify: true,
  removeUnusedCSS: true,
  shorthandInlineCSS: true,
}
