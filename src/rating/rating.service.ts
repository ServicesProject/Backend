import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { RatingDto } from './dto/rating.dto';
import { RatingEntity } from './rating.entity';
import { WorkService } from 'src/work/work.service';
import { RatingMessagesDto } from './dto/rating.messages.dto';
import { UserService } from 'src/user/user.service';


@Injectable()
export class RatingService {

    constructor(@InjectRepository(RatingEntity) private ratingRepository: Repository<RatingEntity>, private workRepository: WorkService, private userRepository: UserService){
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
            message:dto.message?dto.message:''
        }

        const rating = this.ratingRepository.create(ratingToSave)
        return await this.ratingRepository.save(rating)
    }

    async averagePointsForWork(workId: number) {
        const work = await this.workRepository.findById(workId);
        const ratings = await this.ratingRepository.find({ where: { work } });
        const totalPoints = ratings.reduce((acc, rating) => acc + rating.point, 0);
        const averagePoints = totalPoints / ratings.length;
        return Math.round(averagePoints);
      }
      

      
      async getMessagesFromUsers(idWork: number):Promise<RatingMessagesDto[]>{
        const work = await this.workRepository.findById(idWork);
        const notEmptyMessage = await this.ratingRepository.find({
            where:{
                work,
                message: Not('')
            }
        })

        const promises = notEmptyMessage.map(async (x) => {
            const user = await this.userRepository.findById(x.userId);
            const allUserNotification: RatingMessagesDto = {
                user: user,
                message: x.message,
                point: x.point,
                idWork: idWork
            };
            return allUserNotification
          });

          const newList = await Promise.all(promises);
          return newList;
      }



}
