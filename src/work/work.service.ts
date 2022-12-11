import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkEntity } from './work.entity';
import { Repository } from 'typeorm';
import { WorkDto } from './dto/work.dto';

@Injectable()
export class WorkService {

    constructor(@InjectRepository(WorkEntity) private WorkRepository: Repository<WorkEntity>){
    }

    async getAll(): Promise<WorkEntity[]>{
        const list = await this.WorkRepository.find()
        if(!list.length){
            throw new NotFoundException({message: 'Empty data'})
        }
        return list
    }

    async findById(id:number): Promise<WorkEntity> {
        const user = await this.WorkRepository.findOne({
            where:{
                id:id
            }
        })
        if(!user){
            throw new NotFoundException({message: 'User is not in the data'})
        }
        return user
    }

    async create(dto: WorkDto): Promise<any>{
        let userToSave: WorkEntity = {
            id : dto.id,
            job: dto.job,
            experience: dto.experience,
            contract : dto.contract,
            area:  dto.area,
            address: dto.address,
            workTime: dto.workTime,
        }
        const user = this.WorkRepository.create(userToSave);
        await this.WorkRepository.save(user)
        return dto
    }

    async update(id:number, dto: WorkDto): Promise<any>{
        const user = await this.findById(id)
        dto.job? user.job = dto.job: user.job = user.job;
        dto.experience? user.experience = dto.experience: user.experience = user.experience;
        dto.contract? user.contract = dto.contract: user.contract = user.contract;
        dto.area? user.area = dto.area: user.area = user.area;
        dto.address? user.address = dto.address: user.address = user.address;
        dto.workTime? user.workTime = dto.workTime: user.workTime = user.workTime;
        await this.WorkRepository.save(user)
        return{message: 'Updated user'}
    }

    async delete(id: number): Promise<any>{
        const user = await this.findById(id)
        await this.WorkRepository.delete(user)
        return{message: 'User deleted'}
    }



}
