import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { WorkDto } from './dto/work.dto';
import { WorkService } from './work.service';

@Controller('work')
export class WorkController {

    constructor(private readonly workService: WorkService){}

    @Get()
    async getAll(){
        return await this.workService.getAll()
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id:number){
        return await this.workService.findById(id)
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async create(@Body() dto:WorkDto){
        return await this.workService.create(dto)
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id:number,@Body() dto:WorkDto){
        return await this.workService.update(id, dto)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id:number){
        return await this.workService.delete(id)
    }
}
