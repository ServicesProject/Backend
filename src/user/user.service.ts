import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LenderService } from 'src/lender/lender.service';
import { RolType } from 'src/rol/rol.enum';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './user.entity';


@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private UserRepository: Repository<UserEntity>){
        
    }

    async getAll(): Promise<UserEntity[]>{
        const list = await this.UserRepository.find()
        if(!list.length){
            throw new NotFoundException({message: 'Empty data'})
        }
        return list
    }

    async findById(id:number): Promise<UserEntity> {
        const user = await this.UserRepository.findOne({
            where:{
                id:id
            }
        })
        if(!user){
            throw new NotFoundException({message: 'User is not in the data'})
        }
        return user
    }

    async findByEmail(email:string): Promise<UserEntity> {
        const user = await this.UserRepository.findOne({
            where:{
                email:email
            }
        })
        if(!user){
            throw new NotFoundException({message: 'User is not in the data'})
        }
        return user
    }


    async create(dto: UserDto): Promise<any>{
        let userToSave: UserEntity = {
            id: dto.id,
            name: dto.name,
            lastName: dto.lastName,
            phone: dto.phone,
            description: dto.description,
            gender: dto.gender,
            email: dto.email,
            password: dto.password,
            rol: dto.rol,
            complete: dto.complete
        }
        const user = this.UserRepository.create(userToSave);
        await this.UserRepository.save(user)
        return dto
    }

    
    async update(id:number, dto: UserDto): Promise<any>{
        const user = await this.findById(id)
        dto.name? user.name = dto.name: user.name = user.name;
        dto.lastName? user.lastName = dto.lastName: user.lastName = user.lastName;
        dto.phone? user.phone = dto.phone: user.phone = user.phone;
        dto.description? user.description = dto.description: user.description = user.description;
        dto.gender? user.gender = dto.gender: user.gender = user.gender;
        this.UserRepository.merge(user,dto)
        
        return await this.UserRepository.save(user) 

        
    }

    async delete(id: number): Promise<any>{
        const user = await this.findById(id);
        await this.UserRepository.delete(user.id);
        return{message: 'User deleted'}
    }


}
