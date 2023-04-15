import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { RatingEntity } from './rating.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { WorkModule } from 'src/work/work.module';

@Module({
    imports: [TypeOrmModule.forFeature([RatingEntity]), WorkModule],
    providers: [RatingService],
    controllers: [RatingController]
})
export class RatingModule {
    constructor(private dataSource: DataSource){}
}
