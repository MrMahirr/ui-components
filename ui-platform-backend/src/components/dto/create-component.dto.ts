import { IsString, IsNotEmpty, IsOptional, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateComponentDto {
  @ApiProperty({ description: 'Bileşenin görünen adı', example: 'Neon Button' })
  @IsString()
  @IsNotEmpty()
  name: string | undefined;

  @ApiProperty({ description: 'Bileşenin kategorisi', example: 'Buttons' })
  @IsString()
  @IsNotEmpty()
  category: string | undefined;

  @ApiPropertyOptional({ description: 'React formatında kod çıktısı' })
  @IsString()
  @IsOptional()
  raw_react?: string;

  @ApiPropertyOptional({ description: 'HTML formatında kod çıktısı' })
  @IsString()
  @IsOptional()
  raw_html?: string;

  @ApiPropertyOptional({
    description: 'Dinamik ayarlar (JSONB veritabanı kolonu için)',
    example: { colors: { primary: '#3b82f6' } },
  })
  @IsObject()
  @IsOptional()
  default_config?: Record<string, any>;
}
