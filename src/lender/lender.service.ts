import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LenderDto } from './dto/lender.dto';
import { LenderEntity } from './lender.entity';

@Injectable()
export class LenderService {
    constructor(@InjectRepository(LenderEntity) private LenderRepository: Repository<LenderEntity>){
    }

    async getAll(): Promise<LenderEntity[]>{
        const list = await this.LenderRepository.find()
        if(!list.length){
            throw new NotFoundException({message: 'Empty data'})
        }
        return list
    }

    async create(dto: LenderDto): Promise<any>{
        const lender = this.LenderRepository.create(dto);
        return await this.LenderRepository.save(lender)
        
    }

    async findByIdLender(id:number): Promise<LenderEntity> {
        const lender = await this.LenderRepository.findOne({
            where:{
                id:id
            }
        })
        if(!lender){
            throw new NotFoundException({message: 'User is not in the data'})
        }
        return lender
    }

    async getLenderWorkers(id:number): Promise<any>{
        const workers = await this.LenderRepository.findOne({
           where:{id:id},
           relations:['works']
        })
        
        return workers
    }     

}
