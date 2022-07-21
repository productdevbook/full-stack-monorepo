module.exports = {
  client: {
    service: {
      name: 'my-graphql-app',
      localSchemaFile: "./apps/nestjs/schema.graphql",
    },
    includes: ['./packages/oku-api/graphql/**/*.graphql'],
    excludes: ['./packages/oku-api/node-graphql.ts'],
  },
}
