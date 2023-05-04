import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationDto } from './dto/notification.dto';

@Controller('notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService){}

    @Post()
    async enviarNotificacion(@Body() dto: NotificationDto) {
    return this.notificationService.sendNotification(dto);
    }

    @Put(':id/state')
    async changeState(@Param('id') id: number,@Body("state") state: string,@Body("message") text: string){
        return await this.notificationService.changeStateNotification(id,state,text)
    }

    @Get(':id/user')
    async getAllUserNotification(@Param('id', ParseIntPipe) id:number){
        return await this.notificationService.getNotificationUser(id)
    }

    @Get(':lenderEmail/lender')
    async getAllLenderNotification(@Param('lenderEmail') email:string){
        return await this.notificationService.getNotificationLender(email)
    }

    @Get(':id/state/accepted')
    async getAllAcceptUserNotifications(@Param('id', ParseIntPipe) id:number){
        return await this.notificationService.getAcceptedContractsUser(id)
    }

    @Get(':lenderEmail/state/accepted/lenders')
        async getAllAcceptLenderNotifications(@Param('lenderEmail') email: string) {
        return await this.notificationService.getAcceptedContractsLender(email);
    }

    @Get('user/:id/service/:workId')
    async getAcceptContract(@Param('id', ParseIntPipe) id:number, @Param('workId', ParseIntPipe) workId:number){
        return await this.notificationService.getAcceptContract(id,workId)
    }

}
