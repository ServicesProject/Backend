import { Injectable, NotFoundException } from '@nestjs/common';
import { NotificationEntity } from './notification.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationDto } from './dto/notification.dto';
import { LenderService } from 'src/lender/lender.service';
import { UserService } from 'src/user/user.service';
import { WorkService } from 'src/work/work.service';
import { log } from 'console';

@Injectable()
export class NotificationService {
    constructor(@InjectRepository(NotificationEntity) private notificationRepository: Repository<NotificationEntity>, private lenderRepository: LenderService, private userRepository: UserService, private workRepository: WorkService){}


    async sendNotification(dto: NotificationDto){
        const {message, state, userId, lenderEmail, workId} = dto

        let lender = await this.lenderRepository.findByEmailLender(lenderEmail)
        let user = await this.userRepository.findById(userId)
        let work = await this.workRepository.getlenderWork(workId)

        const notification = new NotificationEntity();
        notification.message = message;
        notification.state = 'pendiente';
        
        if(work.lender.id === lender.id){
            notification.workId = workId
        }else{
            throw new NotFoundException({message: 'This service is not in the data'})
        }
        if(user){
            notification.userId = userId
        }else{
            throw new NotFoundException({message: 'This user is not in the data'})
        }
        if(work.lender.email === lenderEmail){
            notification.lenderEmail = lenderEmail
        }else{
            throw new NotFoundException({message: 'This lender is not in the data'})
        }
        return this.notificationRepository.save(notification)
    }


    async changeStateNotification(id: number, newState: string){
        const notificacion = await this.notificationRepository.findOne({
            where:{
                id:id
            }
        });
    
        if (!notificacion) {
          throw new Error('Notificacion no encontrada');
        }
        notificacion.state = newState;
        return await this.notificationRepository.save(notificacion);
      }

      async getAllNotification(): Promise<NotificationEntity[]>{
        const list = await this.notificationRepository.find()
        if(!list.length){
            throw new NotFoundException({message: 'There are not notification'})
        }
        return list
    }

    /*HACER GET PARA LENDER Y OTRO PARA IDUSER*/

}
