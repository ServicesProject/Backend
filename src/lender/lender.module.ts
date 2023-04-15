import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { SharedUsersModule } from 'src/shared/shared-users/shared-users.module';

@Module({
  imports: [SharedUsersModule]
})
export class LenderModule {
  constructor(private dataSource: DataSource){}
}
