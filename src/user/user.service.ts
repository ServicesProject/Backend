import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './user.entity';
import { MailServiceService } from 'src/mailer/mail-service/mail-service.service';
import { ValidateDto } from 'src/token/dto/validate.dto';


@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private UserRepository: Repository<UserEntity>, private mailService: MailServiceService){
        
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
            gender: dto.gender,
            email: dto.email,
            password: dto.password,
            rol: dto.rol,
            complete: dto.complete,
            ci: dto.ci,
            birthdate: dto.birthdate,
            accountConfirmed: dto.accountConfirmed
        }
        const user = this.UserRepository.create(userToSave);
        await this.UserRepository.save(user)
        this.mailService.sendEmailToConfirmAccounht(user.email)
        return dto
    }

    
    async update(id:number, dto: UserDto): Promise<any>{
        const user = await this.findById(id)
        dto.name? user.name = dto.name: user.name = user.name;
        dto.lastName? user.lastName = dto.lastName: user.lastName = user.lastName;
        dto.phone? user.phone = dto.phone: user.phone = user.phone;
        dto.ci? user.ci = dto.ci: user.ci = user.ci;
        dto.gender? user.gender = dto.gender: user.gender = user.gender;
        dto.birthdate? user.birthdate = dto.birthdate: user.birthdate = user.birthdate;
        this.UserRepository.merge(user,dto)
        
        return await this.UserRepository.save(user)
    }

    async validateEmailRegister(email:string): Promise<any>{
        const user = await this.findByEmail(email)
        var usertosave = user
        usertosave.accountConfirmed = true
        this.UserRepository.merge(user,usertosave)
        return await this.UserRepository.save(user)
    }

    async delete(id: number): Promise<any>{
        const user = await this.findById(id);
        await this.UserRepository.delete(user.id);
        return{message: 'User deleted'}
    }


}
