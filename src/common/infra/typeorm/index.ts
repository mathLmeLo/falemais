import { createConnection } from 'typeorm';
import DBConfig from '@config/DatabaseConfig';

const InitDatabase = async (): Promise<void> => createConnection({
  name: 'default',
  type: 'postgres',
  host: DBConfig.host,
  username: DBConfig.username,
  password: DBConfig.password,
  database: DBConfig.database,
  port: DBConfig.port,
  logging: DBConfig.logging,
  migrations: ['./src/config/migrations/production/**/*.ts'],
  entities: ['src/modules/**/infra/typeorm/entities/**.ts'],
}).then(() => {
  console.log('Database connected sucessfully');
}).catch((error) => {
  console.log(`Could not connect to database with error: ${error}`);
});

export default InitDatabase;
