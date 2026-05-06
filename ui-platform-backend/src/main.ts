import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS'u açıyoruz (Frontend farklı portta çalışacağı için)
  app.enableCors();

  // DTO Validasyonlarını global olarak aktif et
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Swagger Konfigürasyonu
  const config = new DocumentBuilder()
    .setTitle('UI Platform API')
    .setDescription('Component library management API')
    .setVersion('1.0')
    .build();

  // Dokümanı oluştur
  const document = SwaggerModule.createDocument(app, config);

  // Swagger'ı 'api' rotasında ayağa kaldır
  SwaggerModule.setup('api', app, document);

  // Sunucuyu 3000 portunda başlat
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
