import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { Sequelize } from 'sequelize-typescript';
import { SequelizeStorage, Umzug } from 'umzug';



let env: any = null
if (!process.env.DB_NAME)
  env = dotenv.parse(fs.readFileSync('.env'));

const usedEnv = env || process.env

export const DB = new Sequelize(
  {
    database: usedEnv.DB_NAME,
    username: usedEnv.DB_USERNAME,
    password: usedEnv.DB_PASSWORD,
    dialect: usedEnv.DB_CONNECTION,
    host: usedEnv.DB_HOST,
    port: +usedEnv.DB_PORT,
    logging: true,
    logQueryParameters: true,
    define: {
      underscored: true,
    },
    dialectOptions: {
      decimalNumbers: true,
      timezone: '+07:00',
    },
    timezone: '+07:00',
  },
)

export const migrator = new Umzug({
  migrations: {
    glob: ['migrations/*.ts', { cwd: __dirname }],
  },
  create: {
    folder: `${__dirname}/migrations`,
    template: filepath => [
      [filepath, fs.readFileSync(`${__dirname}/migration-template.ts`).toString()],
    ]
  },
  context: DB.getQueryInterface(),
  storage: new SequelizeStorage({
    sequelize: DB,
  }),
  logger: console,
});

export type Migration = typeof migrator._types.migration;
