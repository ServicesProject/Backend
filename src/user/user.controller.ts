import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get()
    async getAll(){
        return await this.userService.getAll()
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id:number){
        return await this.userService.findById(id)
    }


    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async create(@Body() dto:UserDto){
        return await this.userService.create(dto)
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id:number,@Body() dto:UserDto){
        return await this.userService.update(id, dto)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id:number){
        return await this.userService.delete(id)
    }
}
