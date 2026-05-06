import { Injectable, OnApplicationBootstrap, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { INITIAL_COMPONENTS } from './seed-data';
import { ComponentEntity } from '../components/interfaces/component.interface';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(@Inject('DATABASE_POOL') private readonly pool: Pool) {}

  async onApplicationBootstrap() {
    // Force reload trigger: database automatic update
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

      console.log('🌱 Seed işlemi başlatılıyor...');
      const components = INITIAL_COMPONENTS as Partial<ComponentEntity>[];

      for (const comp of components) {
        await client.query(
          `INSERT INTO components (name, category, slug, raw_react, raw_html, default_config) 
           VALUES ($1, $2, $3, $4, $5, $6)
           ON CONFLICT (slug) DO UPDATE SET 
             name = EXCLUDED.name,
             category = EXCLUDED.category,
             raw_react = EXCLUDED.raw_react,
             raw_html = EXCLUDED.raw_html,
             default_config = EXCLUDED.default_config`,
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
    } catch (err) {
      console.error('❌ Seed Hatası:', err);
    } finally {
      client.release();
    }
  }
}
