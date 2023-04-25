import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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
    async changeState(@Param('id') id: number,@Body("state") state: string){
        return await this.notificationService.changeStateNotification(id,state)
    }

    @Get()
    async getAll(){
        return await this.notificationService.getAllNotification()
    }

}
