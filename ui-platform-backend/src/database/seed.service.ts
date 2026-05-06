import { Injectable, OnApplicationBootstrap, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { INITIAL_COMPONENTS } from './seed-data';
import { ComponentEntity } from '../components/interfaces/component.interface';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(@Inject('DATABASE_POOL') private readonly pool: Pool) {}

  async onApplicationBootstrap() {
    await this.runSeed();
  }

  private async runSeed() {
    const client = await this.pool.connect();
    try {
      // 1. Tabloyu oluştur (Raw SQL)
      await client.query(`
        CREATE TABLE IF NOT EXISTS components (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          category VARCHAR(100) NOT NULL,
          slug VARCHAR(255) UNIQUE NOT NULL,
          raw_react TEXT,
          raw_html TEXT,
          default_config JSONB NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      const { rows } = await client.query('SELECT COUNT(*) FROM components');
      if (parseInt(rows[0].count) === 0) {
        console.log('🌱 Seed işlemi başlatılıyor...');
        const components = INITIAL_COMPONENTS as Partial<ComponentEntity>[];

        for (const comp of components) {
          await client.query(
            'INSERT INTO components (name, category, slug, raw_react, raw_html, default_config) VALUES ($1, $2, $3, $4, $5, $6)',
            [
              comp.name,
              comp.category,
              comp.slug,
              comp.raw_react,
              comp.raw_html,
              JSON.stringify(comp.default_config),
            ],
          );
        }
        console.log('✅ Veritabanı başarıyla dolduruldu.');
      }
    } catch (err) {
      console.error('❌ Seed Hatası:', err);
    } finally {
      client.release();
    }
  }
}
