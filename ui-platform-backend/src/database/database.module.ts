import { Module, Global } from '@nestjs/common';
import { databaseProvider } from './database.provider';
import { SeedService } from './seed.service';

@Global()
@Module({
  providers: [databaseProvider, SeedService],
  exports: [databaseProvider], // Diğer modüllerin DATABASE_POOL'a erişmesi için şart
})
export class DatabaseModule {}
