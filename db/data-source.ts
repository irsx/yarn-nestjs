import type { DataSourceOptions } from 'typeorm';
import { DataSource } from 'typeorm';
import type { SeederOptions } from 'typeorm-extension';
require('dotenv').config();

export const dataSourceConfig: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  entities: ['dist/**/*.entity.{js,ts}'],
  subscribers: ['dist/**/*.subscriber.{js,ts}'],
  migrations: ['dist/db/migrations/*.{js,ts}'],
  logging: process.env.ENV === 'local' ? ['query', 'error'] : false,
};

const dataSource = new DataSource(dataSourceConfig);
export default dataSource;
