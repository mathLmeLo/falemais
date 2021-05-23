/* eslint-disable import/no-extraneous-dependencies */
import 'ts-node/register';
import 'tsconfig-paths/register';

import { createConnection, getConnection } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

beforeAll(async () => {
  await createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT),
    logging: process.env.DB_LOGGING === 'true',
    entities: ['src/modules/**/infra/typeorm/entities/**.ts'],
    synchronize: false,
    name: 'default',
  });
}, 50000);

afterAll(async () => {
  await getConnection().close();
});
