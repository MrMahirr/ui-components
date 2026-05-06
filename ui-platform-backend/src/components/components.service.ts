import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { ComponentsRepository } from './components.repository';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';

@Injectable()
export class ComponentsService {
  constructor(private readonly repository: ComponentsRepository) {}

  // İsimden otomatik SEO uyumlu URL (slug) üreten yardımcı fonksiyon
  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number) {
    const component = await this.repository.findById(id);
    if (!component)
      throw new NotFoundException(`Component with ID ${id} not found`);
    return component;
  }

  async findBySlug(slug: string) {
    const component = await this.repository.findBySlug(slug);
    if (!component)
      throw new NotFoundException(`Component with slug ${slug} not found`);
    return component;
  }

  async create(createComponentDto: CreateComponentDto) {
    const slug = this.generateSlug(createComponentDto.name);

    // Aynı slug var mı kontrolü
    const existing = await this.repository.findBySlug(slug);
    if (existing) {
      throw new ConflictException(
        `Component with name '${createComponentDto.name}' already exists.`,
      );
    }

    return this.repository.create(slug, createComponentDto);
  }

  async update(id: number, updateComponentDto: UpdateComponentDto) {
    await this.findOne(id); // Varlığını kontrol et (Yoksa 404 fırlatır)

    // Eğer isim güncelleniyorsa, yeni slug'ı da DTO içine ekleyebiliriz veya ayrı tutabiliriz.
    // Şimdilik sadece gönderilen verileri güncelliyoruz.
    return this.repository.update(id, updateComponentDto);
  }

  async remove(id: number) {
    await this.findOne(id); // Varlığını kontrol et
    await this.repository.remove(id);
    return { message: 'Component deleted successfully' };
  }
}
