import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { LenderController } from './lender.controller';
import { LenderEntity } from './lender.entity';
import { LenderService } from './lender.service';

@Module({
  imports: [TypeOrmModule.forFeature([LenderEntity])],
  providers: [LenderService],
  controllers: [LenderController],
  exports:[LenderService]
})
export class LenderModule {
  constructor(private dataSource: DataSource){}
}
