import * as dotenv from 'dotenv';
import * as fs from 'fs';
import sequelize = require('sequelize');
import { Sequelize } from 'sequelize-typescript';
import { SequelizeStorage, Umzug } from 'umzug';

const Op = sequelize.Op;


const operatorsAliases = {
  eq: Op.eq,
  ne: Op.ne,
  gte: Op.gte,
  gt: Op.gt,
  lte: Op.lte,
  lt: Op.lt,
  not: Op.not,
  in: Op.in,
  notIn: Op.notIn,
  is: Op.is,
  like: Op.like,
  notLike: Op.notLike,
  iLike: Op.iLike,
  notILike: Op.notILike,
  regexp: Op.regexp,
  notRegexp: Op.notRegexp,
  iRegexp: Op.iRegexp,
  notIRegexp: Op.notIRegexp,
  between: Op.between,
  notBetween: Op.notBetween,
  overlap: Op.overlap,
  contains: Op.contains,
  contained: Op.contained,
  adjacent: Op.adjacent,
  strictLeft: Op.strictLeft,
  strictRight: Op.strictRight,
  noExtendRight: Op.noExtendRight,
  noExtendLeft: Op.noExtendLeft,
  and: Op.and,
  or: Op.or,
  any: Op.any,
  all: Op.all,
  values: Op.values,
  col: Op.col,
};



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
    operatorsAliases,
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
