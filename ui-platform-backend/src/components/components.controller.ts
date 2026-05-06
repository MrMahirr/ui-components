import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ComponentsService } from './components.service';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';

@ApiTags('Components') // Swagger'da grubu belirler
@Controller('components')
export class ComponentsController {
  constructor(private readonly componentsService: ComponentsService) {}

  @Post()
  @ApiOperation({ summary: 'Yeni bir UI bileşeni oluşturur' })
  @ApiResponse({ status: 201, description: 'Bileşen başarıyla oluşturuldu.' })
  @ApiResponse({
    status: 409,
    description: 'Bu isimde bir bileşen zaten mevcut.',
  })
  create(@Body() createComponentDto: CreateComponentDto) {
    return this.componentsService.create(createComponentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Tüm bileşenleri listeler' })
  findAll() {
    return this.componentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID değerine göre tek bir bileşen getirir' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.componentsService.findOne(id);
  }

  @Get('slug/:slug')
  @ApiOperation({
    summary: 'Slug değerine göre (URL uyumlu isim) tek bir bileşen getirir',
  })
  findBySlug(@Param('slug') slug: string) {
    return this.componentsService.findBySlug(slug);
  }

  @Patch(':id')
  @ApiOperation({
    summary:
      'Belirtilen bileşeni günceller (Sadece gönderilen alanları değiştirir)',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateComponentDto: UpdateComponentDto,
  ) {
    return this.componentsService.update(id, updateComponentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Belirtilen bileşeni siler' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.componentsService.remove(id);
  }
}
