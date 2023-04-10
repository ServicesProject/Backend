import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { LenderDto } from './dto/lender.dto';
import { LenderEntity } from './lender.entity';


@Injectable()
export class LenderService {
    constructor(@InjectRepository(LenderEntity) private LenderRepository: Repository<LenderEntity>, private userService: UserService){
    }

    async getAll(): Promise<LenderEntity[]>{
        const list = await this.LenderRepository.find()
        if(!list.length){
            throw new NotFoundException({message: 'Empty data'})
        }
        return list
    }

    async create(dto: LenderDto): Promise<any>{
        const user = this.userService.findByEmail(dto.email)
        if(user){
            const lender = this.LenderRepository.create(dto);
            return await this.LenderRepository.save(lender)
        }
        throw new NotFoundException({message: 'Can not create lender'})
    }

    async findByIdLender(id:number): Promise<LenderEntity> {
        const lender = await this.LenderRepository.findOne({
            where:{
                id: id
            }
        })
        if(!lender){
            throw new NotFoundException({message: 'Lender is not in the data'})
        }
        return lender
    }


    async findByEmailLender(email:string): Promise<LenderEntity> {
        const lender = await this.LenderRepository.findOne({
            where:{
                email: email
            }
        })
        if(!lender){
            throw new NotFoundException({message: 'This email doent exists'})
        }
        return lender
    }

    async getLenderWorks(id:number): Promise<any>{
        const workers = await this.LenderRepository.findOne({
           where:{id:id},
           relations:['works']
        })
        
        return workers.works
    }

    
    
    async updateLender(email:string, dto: LenderDto): Promise<any>{
        const lender = await this.findByEmailLender(email)
        console.log(lender);
        
        if(lender){
            dto.name? lender.name = dto.name: lender.name = lender.name;
            dto.lastName? lender.lastName = dto.lastName: lender.lastName = lender.lastName;
            dto.phone? lender.phone = dto.phone: lender.phone = lender.phone;
            dto.description? lender.description = dto.description: lender.description = lender.description;
            dto.gender? lender.gender = dto.gender: lender.gender = lender.gender;
            dto.ci? lender.ci = dto.ci: lender.ci = lender.ci;
            dto.birthdate? lender.birthdate = dto.birthdate: lender.birthdate = lender.birthdate;
            this.LenderRepository.merge(lender,dto)
            return await this.LenderRepository.save(lender)
        }
        else{
            throw new NotFoundException({message: 'Lender is not in the data'})
        }
        
    }

}
