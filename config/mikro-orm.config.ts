import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { User } from '../src/user/user.entity';
import { Migrator, TSMigrationGenerator } from '@mikro-orm/migrations';
import * as process from 'node:process';

const config: Options = {
  entities: [User],
  entitiesTs: ['./src/**/*.entity.ts'],
  driver: PostgreSqlDriver,
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  user: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'password',
  dbName: process.env.DB_DATABASE || 'linkz',
  migrations: {
    tableName: 'mikro_orm_migrations',
    pathTs: './migrations',
    transactional: true,
    disableForeignKeys: true,
    allOrNothing: true,
    dropTables: true,
    safe: false,
    emit: 'ts',
    generator: TSMigrationGenerator,
  },
  discovery: {
    warnWhenNoEntities: true,
    requireEntitiesArray: false,
    alwaysAnalyseProperties: true,
  },
  extensions: [Migrator],
};

export default config;
