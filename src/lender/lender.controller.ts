import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LenderDto } from './dto/lender.dto';
import { LenderService } from './lender.service';

@Controller('lender')
export class LenderController {

    constructor(private readonly lenderService: LenderService){}

    @Get()
    async getAll(){
        return await this.lenderService.getAll()
    }

    @Post()
    async create(@Body() dto:LenderDto){
        return await this.lenderService.create(dto)
    }

    @Get(':id/works')
    async getAllWorks(@Param('id', ParseIntPipe) id:number){
        return await this.lenderService.getLenderWorkers(id)
    }



}
