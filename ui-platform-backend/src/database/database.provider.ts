import { Pool } from 'pg';

export const DATABASE_POOL = 'DATABASE_POOL';

export const databaseProvider = {
  provide: DATABASE_POOL,
  useFactory: () => {
    const pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'ui_platform',
      password: 'admin123',
      port: 4566,
      max: 20, // Maksimum bağlantı sayısı
      idleTimeoutMillis: 30000,
    });

    pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
    });

    return pool;
  },
};
