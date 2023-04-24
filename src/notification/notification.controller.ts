import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationDto } from './dto/notification.dto';

@Controller('notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService){}

    @Post()
    async enviarNotificacion(@Body() dto: NotificationDto) {
    return this.notificationService.sendNotification(dto);
    }
}
