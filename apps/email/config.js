/*
|-------------------------------------------------------------------------------
| Development config               https://maizzle.com/docs/environments/#local
|-------------------------------------------------------------------------------
|
| The exported object contains the default Maizzle settings for development.
| This is used when you run `maizzle build` or `maizzle serve` and it has
| the fastest build time, since most transformations are disabled.
|
*/

module.exports = {
  build: {
    posthtml: {
      expressions: {
        delimiters: ['[[', ']]'],
        unescapeDelimiters: ['[[[', ']]]'],
      }
    },
    templates: {
      source: 'src/templates',
      destination: {
        path: 'build_local',
      },
    },
    layouts: {
      root: 'src/layouts',
    },
    components: {
      root: 'src/components',
    },
    tailwind: {
      config: 'tailwind.config.js',
      css: 'src/css/tailwind.css',
    },
    browsersync: {
      port: 3200, // change this
    }
  },
  baseImageURL: '/public/',
  company: {
    name: 'Hello',
    address: `
    <br>1234 Street Rd.
    <br>Suite 1234
    `,
    product: 'App Name',
    sender: 'asdasd.com',
  },
  year: () => new Date().getFullYear(),
}