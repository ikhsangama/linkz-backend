import {Options, PostgreSqlDriver} from '@mikro-orm/postgresql';
import {User} from "../src/user/user.entity";
import {Migrator, TSMigrationGenerator} from "@mikro-orm/migrations";

const config: Options = {
    entities: [User],
    entitiesTs: ['./src/**/*.entity.ts'],
    driver: PostgreSqlDriver,
    host: 'localhost',
    port: 5432,
    user: 'user',
    password: 'password',
    dbName: 'linkz',
    migrations: {
        tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
        pathTs: './migrations', // path to the folder with migrations
        transactional: true, // wrap each migration in a transaction
        disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
        allOrNothing: true, // wrap all migrations in master transaction
        dropTables: true, // allow to disable table dropping
        safe: false, // allow to disable table and column dropping
        emit: 'ts', // migration generation mode
        generator: TSMigrationGenerator,
    },
    discovery: {
        warnWhenNoEntities: true,
        requireEntitiesArray: false,
        alwaysAnalyseProperties: true,
    },
    extensions: [Migrator]
};

export default config;