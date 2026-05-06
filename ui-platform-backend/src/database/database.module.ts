import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

// Bu sabiti repository dosyalarımızda @Inject(PG_CONNECTION) ile kullanacağız
export const PG_CONNECTION = 'PG_CONNECTION';

@Global() // Modülü global yapar, böylece her modülde tek tek import etmemize gerek kalmaz
@Module({
  providers: [
    {
      provide: PG_CONNECTION,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const pool = new Pool({
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          user: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
        });

        return pool;
      },
    },
  ],
  exports: [PG_CONNECTION], // Havuzu dışarı açıyoruz
})
export class DatabaseModule {}
