import { Injectable, NotFoundException } from '@nestjs/common';
import { NotificationEntity } from './notification.entity';
import { In, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationDto } from './dto/notification.dto';
import { LenderService } from 'src/lender/lender.service';
import { UserService } from 'src/user/user.service';
import { WorkService } from 'src/work/work.service';
import { NotificationWithWorkDto } from './dto/notificationWithWorks.dto';
import { NotificationWorkUserDto } from './dto/notificationWorkUser.dto';


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


    async changeStateNotification(id: number, newState: string, newMessage:string){
        const notificacion = await this.notificationRepository.findOne({
            where:{
                id:id
            }
        });
        if (!notificacion) {
          throw new Error('Notificacion no encontrada');
        }
        notificacion.state = newState;
        notificacion.message= newMessage
        return await this.notificationRepository.save(notificacion);
      }

      async getNotificationUser(idUser: number): Promise<NotificationEntity[]>{
        const list = await this.notificationRepository.find({
            where:{
                userId:idUser,
                state: In(["aceptado", "rechazado"]),
            }, 
        })     
        return list
    }
 
    async getNotificationLender(email: string): Promise<NotificationEntity[]>{
        const list = await this.notificationRepository.find({
            where:{
                lenderEmail:email,
                state: "pendiente"
            }, 
        })
        return list
    }

    async getAcceptedContractsUser(idUser: number):Promise<NotificationWithWorkDto[]>{
        const list = await this.notificationRepository.find({
            where:{
                userId:idUser,
                state: In(["aceptado", "terminado", "recibido"])
            }, 
        })
        
        const promises = list.map(async (x) => {
            const work = await this.workRepository.getlenderWork(x.workId);
            const notificationWithWork: NotificationWithWorkDto = {
              work: work,
              message: x.message,
              state: x.state,
              userId: x.userId,
              lenderEmail: x.lenderEmail
            };
            return notificationWithWork;
          });
        
          const newList = await Promise.all(promises);
        
          return newList;
    }

    async getAcceptedContractsLender(email: string):Promise<NotificationWorkUserDto[]>{
        const list = await this.notificationRepository.find({
            where:{
                lenderEmail:email,
                state: In(["aceptado", "terminado", "recibido"])
            }, 
        })

        const promises = list.map(async (x) => {
            const work = await this.workRepository.getlenderWork(x.workId);
            let user = await this.userRepository.findById(x.userId)
            const notificationWithWork: NotificationWorkUserDto = {
              work: work,
              user:user,
              message: x.message,
              state: x.state,
              lenderEmail: x.lenderEmail
            };
            return notificationWithWork;
          });
        
          const newList = await Promise.all(promises);
        
          return newList;
    }

    async getAcceptContract(idUser: number, idWork:number ): Promise<NotificationEntity>{
        const list = await this.notificationRepository.findOne({
            where:{
                userId:idUser,
                workId: idWork,
                state: In(["aceptado", "recibido"])
            }, 
        })
    
        return list
    }

}
