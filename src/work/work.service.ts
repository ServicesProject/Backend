import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkEntity } from './work.entity';
import { Repository } from 'typeorm';
import { WorkDto } from './dto/work.dto';
import { CreateWorkDto } from './dto/createWork.dto';
import {LenderService} from '../lender/lender.service'

@Injectable()
export class WorkService {
    LenderService: any;

    constructor(@InjectRepository(WorkEntity) private WorkRepository: Repository<WorkEntity>, private lenderRepository: LenderService){
    }

    async getAll(): Promise<WorkEntity[]>{
        const list = await this.WorkRepository.find()
        if(!list.length){
            throw new NotFoundException({message: 'Empty data'})
        }
        return list
    }

    async findById(id:number): Promise<WorkEntity> {
        const worker = await this.WorkRepository.findOne({
            where:{
                id:id
            }
        })
        if(!worker){
            throw new NotFoundException({message: 'Worker is not in the data'})
        }
        return worker
    }

    async create(dto: CreateWorkDto): Promise<any>{
        const lender = await this.lenderRepository.findByEmailLender(dto.lenderEmail)
        let workToSave: WorkEntity = {
            id: dto.id,
            job: dto.job,
            experience: dto.experience,
            contract: dto.contract,
            area: dto.area,
            address: dto.address,
            workTime: dto.workTime,
            lender: lender
        }
        const work = this.WorkRepository.create(workToSave);
        return await this.WorkRepository.save(work)
    }

    async update(id:number, dto: WorkDto): Promise<any>{
        const worker = await this.findById(id)
        dto.job? worker.job = dto.job: worker.job = worker.job;
        dto.experience? worker.experience = dto.experience: worker.experience = worker.experience;
        dto.contract? worker.contract = dto.contract: worker.contract = worker.contract;
        dto.area? worker.area = dto.area: worker.area = worker.area;
        dto.address? worker.address = dto.address: worker.address = worker.address;
        dto.workTime? worker.workTime = dto.workTime: worker.workTime = worker.workTime;
        await this.WorkRepository.save(worker)
        return{message: 'Updated worker'}
    }

    async delete(id: number): Promise<any>{
        const worker = await this.findById(id)
        await this.WorkRepository.delete(worker)
        return{message: 'Worker deleted'}
    }



}
