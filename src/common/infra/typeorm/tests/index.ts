/* eslint-disable import/no-extraneous-dependencies */
import { createConnection, getConnection } from 'typeorm';

import 'ts-node/register';
import 'tsconfig-paths/register';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

const ENTITIES = ['src/modules/**/infra/typeorm/entities/**.ts'];
const MIGRATIONS = ['./src/config/migrations/tests/**/*.ts'];

const InitDatabase = async (): Promise<void> => {

  const t0 = Date.now();

  const connection = await createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT),
    logging: process.env.DB_LOGGING === 'true',
    migrations: MIGRATIONS,
    entities: ENTITIES,
    synchronize: true,
    dropSchema: true,
    name: 'default',
  });

  const connectTime = Date.now();
  await connection.runMigrations();
  const migrationTime = Date.now();

  console.log(
    ` 👩‍🔬 Connected in ${connectTime
      - t0}ms - Executed migrations in ${migrationTime - connectTime}ms.`,
  );

  await getConnection().close();
};

export default InitDatabase;
