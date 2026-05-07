import { Pool } from 'pg';

export const DATABASE_POOL = 'DATABASE_POOL';

export const databaseProvider = {
  provide: DATABASE_POOL,
  useFactory: () => {
    const pool = new Pool({
      user: process.env.DB_USER || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'ui_platform',
      password: process.env.DB_PASSWORD || 'admin123',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 4566,
      max: 20, // Maksimum bağlantı sayısı
      idleTimeoutMillis: 30000,
    });

    pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
    });

    return pool;
  },
};
