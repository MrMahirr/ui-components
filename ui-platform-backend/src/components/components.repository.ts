import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { DATABASE_POOL } from '../database/database.provider';
import { ComponentEntity } from './interfaces/component.interface';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';

@Injectable()
export class ComponentsRepository {
  constructor(@Inject(DATABASE_POOL) private readonly pool: Pool) {}

  /**
   * Tüm bileşenleri tarihe göre azalan sırada getirir.
   */
  async findAll(): Promise<ComponentEntity[]> {
    const query = 'SELECT * FROM components ORDER BY created_at DESC';
    const result = await this.pool.query<ComponentEntity>(query);
    return result.rows;
  }

  /**
   * ID üzerinden tek bir bileşen bulur.
   */
  async findById(id: number): Promise<ComponentEntity | null> {
    const query = 'SELECT * FROM components WHERE id = $1';
    const result = await this.pool.query<ComponentEntity>(query, [id]);
    return result.rows[0] || null;
  }

  /**
   * Slug üzerinden tek bir bileşen bulur (Frontend için kritik).
   */
  async findBySlug(slug: string): Promise<ComponentEntity | null> {
    const query = 'SELECT * FROM components WHERE slug = $1';
    const result = await this.pool.query<ComponentEntity>(query, [slug]);
    return result.rows[0] || null;
  }

  /**
   * Yeni bir bileşen oluşturur.
   */
  async create(
    slug: string,
    data: CreateComponentDto,
  ): Promise<ComponentEntity> {
    const query = `
      INSERT INTO components (name, category, slug, raw_react, raw_html, default_config)
      VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;

    const values = [
      data.name,
      data.category,
      slug,
      data.raw_react || null,
      data.raw_html || null,
      JSON.stringify(data.default_config || {}), // JSONB uyumu için stringify
    ];

    const result = await this.pool.query<ComponentEntity>(query, values);
    return result.rows[0];
  }

  /**
   * Dinamik SQL kullanarak mevcut bileşeni günceller.
   */
  async update(
    id: number,
    data: UpdateComponentDto,
  ): Promise<ComponentEntity | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let queryIndex = 1;

    // Sadece tanımlı (defined) alanları güncellemeye dahil et
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        // default_config güncelleniyorsa JSON formatına çevir
        const finalValue =
          key === 'default_config' ? JSON.stringify(value) : value;

        fields.push(`${key} = $${queryIndex}`);
        values.push(finalValue);
        queryIndex++;
      }
    }

    if (fields.length === 0) return this.findById(id);

    // Otomatik update_at güncellemesi ve WHERE koşulu
    fields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id); // ID her zaman son parametre ($queryIndex) olacak

    const query = `
      UPDATE components
      SET ${fields.join(', ')}
      WHERE id = $${queryIndex}
        RETURNING *;
    `;

    const result = await this.pool.query<ComponentEntity>(query, values);
    return result.rows[0] || null;
  }

  /**
   * Bileşeni veritabanından siler.
   */
  async remove(id: number): Promise<boolean> {
    const query = 'DELETE FROM components WHERE id = $1';
    const result = await this.pool.query(query, [id]);
    return (result.rowCount ?? 0) > 0;
  }
}
