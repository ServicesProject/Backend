import { Module } from '@nestjs/common';
import { WorkService } from './work.service';
import { WorkController } from './work.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkEntity } from './work.entity';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([WorkEntity])],
  providers: [WorkService],
  controllers: [WorkController]
})
export class WorkModule {
  constructor(private dataSource: DataSource){}
}
