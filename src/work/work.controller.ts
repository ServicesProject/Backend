import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateWorkDto } from './dto/createWork.dto';
import { WorkDto } from './dto/work.dto';
import { WorkService } from './work.service';
import { searchWorks} from './dto/searchWork.dto';

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

    @Get(':id/lenderWork')
    async getLenderworks(@Param('id', ParseIntPipe) id:number){
        return await this.workService.getlenderWork(id)
    }


    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async create(@Body() dto:CreateWorkDto){
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

    @Post('filtro')
    async dataFilter(@Body() dto:searchWorks){
        return await this.workService.searchWorksintheMap(dto)
    }

}
