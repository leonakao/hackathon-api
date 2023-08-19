import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export const connectionSource = new DataSource({
  type: process.env.DATABASE_DRIVER as any,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['./src/modules/**/entities/*.entity{.ts,.js}'],
  migrations: ['./src/shared/database/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations_typeorm',
});
