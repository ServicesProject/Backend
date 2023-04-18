import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RatingDto } from './dto/rating.dto';
import { RatingEntity } from './rating.entity';
import { WorkService } from 'src/work/work.service';

@Injectable()
export class RatingService {

    constructor(@InjectRepository(RatingEntity) private ratingRepository: Repository<RatingEntity>, private workRepository: WorkService){
    }

    async getAll():Promise<RatingEntity[]>{
        const list = await this.ratingRepository.find()
        if(!list.length){
            throw new NotFoundException({message: 'Empty data'})
        }
        return list
    }

    async createRating(dto: RatingDto): Promise<any>{
        
        const work = await this.workRepository.findById(dto.idWork)

        let ratingToSave: RatingEntity = {
            id: dto.id,
            work: work,
            userId: dto.idUser,
            point: dto.point,
            message:dto.message
        }

        const rating = this.ratingRepository.create(ratingToSave)
        return await this.ratingRepository.save(rating)
    }

    

    

}
