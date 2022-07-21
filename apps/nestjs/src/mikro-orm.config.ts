import { LoadStrategy, Options, UnderscoreNamingStrategy } from '@mikro-orm/core'
import { TSMigrationGenerator } from '@mikro-orm/migrations'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import { SqlHighlighter } from '@mikro-orm/sql-highlighter'
import { Logger } from '@nestjs/common'
import envConfig from './config'

const logger = new Logger('MikroORM')

const MikroOrmConfig: Options = {
  entities: ['./dist/src/entities'],
  entitiesTs: ['./src/entities'],
  seeder: {
    path: './seeders', // path to the folder with seeders
    pathTs: undefined, // path to the folder with TS seeders (if used, we should put path to compiled files in `path`)
    defaultSeeder: 'DatabaseSeeder', // default seeder class name
    glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
    emit: 'ts', // seeder generation mode
    fileName: (className: string) => className, // seeder file naming convention
  },
  metadataProvider: TsMorphMetadataProvider,
  forceUtcTimezone: true,
  namingStrategy: UnderscoreNamingStrategy,
  type: 'postgresql',
  debug: true,
  highlighter: new SqlHighlighter(),
  clientUrl: envConfig.DATABASE_URL,
  validate: true,
  strict: true,
  migrations: {
    path: './dist/migrations',
    pathTs: './migrations',
    generator: TSMigrationGenerator,
  },
  cache: { options: { cacheDir: './temp' } },
  logger: logger.log.bind(logger),
  loadStrategy: LoadStrategy.JOINED,
}

export default MikroOrmConfig
