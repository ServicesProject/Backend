import { Module } from '@nestjs/common';
import { WorkService } from './work.service';
import { WorkController } from './work.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkEntity } from './work.entity';
import { DataSource } from 'typeorm';
import { SharedUsersModule } from 'src/shared/shared-users/shared-users.module';

@Module({
  imports: [TypeOrmModule.forFeature([WorkEntity]),  SharedUsersModule],
  providers: [WorkService],
  controllers: [WorkController],
  exports: [WorkService]
})
export class WorkModule {
  constructor(private dataSource: DataSource){}
}
