import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingDto } from './dto/rating.dto';


@Controller('rating')
export class RatingController {

    constructor(private readonly ratingService: RatingService){}
    
    @Post()
    async createRating(@Body() dto: RatingDto){
        return await this.ratingService.createRating(dto)
    }

}
