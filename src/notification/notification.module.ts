import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from './notification.entity';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { SharedUsersModule } from 'src/shared/shared-users/shared-users.module';
import { DataSource } from 'typeorm';
import { WorkModule } from 'src/work/work.module';

@Module({
    imports:[
        TypeOrmModule.forFeature([
            NotificationEntity
        ]),
        SharedUsersModule,
        WorkModule
    ],
    providers: [NotificationService],
    controllers: [NotificationController],
})
export class NotificationModule {
    constructor(private dataSource: DataSource){}
}
