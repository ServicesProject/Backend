import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { RatingEntity } from './rating.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { WorkModule } from 'src/work/work.module';
import { SharedUsersModule } from 'src/shared/shared-users/shared-users.module';


@Module({
    imports: [TypeOrmModule.forFeature([RatingEntity]), WorkModule, SharedUsersModule],
    providers: [RatingService],
    controllers: [RatingController]
})
export class RatingModule {
    constructor(private dataSource: DataSource){}
}
