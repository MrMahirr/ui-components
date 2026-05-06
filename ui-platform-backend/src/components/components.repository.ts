import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_CONNECTION } from '../database/database.module';
import { ComponentEntity } from './interfaces/component.interface';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';

@Injectable()
export class ComponentsRepository {
  constructor(@Inject(PG_CONNECTION) private readonly pool: Pool) {}

  async findAll(): Promise<ComponentEntity[]> {
    const result = await this.pool.query(
      'SELECT * FROM components ORDER BY created_at DESC',
    );
    return result.rows;
  }

  async findById(id: number): Promise<ComponentEntity | null> {
    const result = await this.pool.query(
      'SELECT * FROM components WHERE id = $1',
      [id],
    );
    return result.rows[0] || null;
  }

  async findBySlug(slug: string): Promise<ComponentEntity | null> {
    const result = await this.pool.query(
      'SELECT * FROM components WHERE slug = $1',
      [slug],
    );
    return result.rows[0] || null;
  }

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
      data.default_config || {},
    ];

    const result = await this.pool.query(query, values);
    return result.rows[0];
  }

  async update(
    id: number,
    data: UpdateComponentDto,
  ): Promise<ComponentEntity | null> {
    // Sadece gönderilen alanları dinamik olarak güncelleyen Raw SQL oluşturucu
    const fields = [];
    const values = [];
    let queryIndex = 1;

    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        fields.push(`${key} = $${queryIndex}`);
        values.push(value);
        queryIndex++;
      }
    }

    if (fields.length === 0) return this.findById(id);

    fields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id); // ID her zaman son parametre

    const query = `
      UPDATE components 
      SET ${fields.join(', ')} 
      WHERE id = $${queryIndex} 
      RETURNING *;
    `;

    const result = await this.pool.query(query, values);
    return result.rows[0] || null;
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.pool.query(
      'DELETE FROM components WHERE id = $1',
      [id],
    );
    return (result.rowCount ?? 0) > 0;
  }
}
