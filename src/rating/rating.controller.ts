import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingDto } from './dto/rating.dto';


@Controller('rating')
export class RatingController {

    constructor(private readonly ratingService: RatingService){}
    
    @Post()
    async createRating(@Body() dto: RatingDto){
        return await this.ratingService.createRating(dto)
    }

    @Get(':id/average-points')
    async getAveragePointsForWork(@Param('id') id: number) {
      const averagePoints = await this.ratingService.averagePointsForWork(id);
      return { averagePoints };
    }

    @Get(':id/messages')
    async getMessagesForWork(@Param('id') id: number) {
      return await this.ratingService.getMessagesFromUsers(id)
    }

}
