/* eslint-disable import/no-mutable-exports */

import 'dotenv/config';

interface IDatabaseConfig {
  type: 'mysql' | 'mariadb' | 'postgres' | 'cockroachdb' | 'sqlite' | 'mssql' | 'sap' | 'oracle' | 'cordova' | 'nativescript' | 'react-native' | 'sqljs' | 'mongodb' | 'aurora-data-api' | 'aurora-data-api-pg' | 'expo' | 'better-sqlite3';
  host: string;
  username: string;
  password: string;
  database: string;
  port: number;
  logging: boolean;
}

const databaseConfig: IDatabaseConfig = {
  type: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),
  logging: process.env.DB_LOGGING === 'true',
} as IDatabaseConfig;

export default databaseConfig as IDatabaseConfig;
