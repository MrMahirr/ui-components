import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ComponentsModule } from './components/components.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ComponentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
