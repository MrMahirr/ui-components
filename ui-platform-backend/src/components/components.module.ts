import { Module } from '@nestjs/common';
import { ComponentsService } from './components.service';
import { ComponentsController } from './components.controller';
import { ComponentsRepository } from './components.repository';

@Module({
  controllers: [ComponentsController],
  providers: [ComponentsService, ComponentsRepository],
  exports: [ComponentsService],
})
export class ComponentsModule {}
