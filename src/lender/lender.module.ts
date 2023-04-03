import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { DataSource } from 'typeorm';
import { LenderController } from './lender.controller';
import { LenderEntity } from './lender.entity';
import { LenderService } from './lender.service';
import { SharedUsersModule } from 'src/shared/shared-users/shared-users.module';

@Module({
  imports: [SharedUsersModule],
})
export class LenderModule {
  constructor(private dataSource: DataSource){}
}
