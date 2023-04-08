import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { Authorization } from 'src/decorators/authorization.decorator';
import { LoginDto } from './dto/login.dto';
import { ValidateDto } from './dto/validate.dto';

@Controller('token')
export class TokenController {

    constructor(
        private authenticationService: AuthService,
        ) {}

    @Authorization(false)
    @Post()
    async getToken(@Body() loginDto: LoginDto){
        try{
            const token = await this.authenticationService.login(
                loginDto.email,
                loginDto.password,
              );
              return token
        }
        catch(err){
          console.log(err);
          
        }
        
    }
    @Authorization(false)
    @Put('validateEmail')
    async validateEmail(@Body() dto: ValidateDto){
        try{
            await this.authenticationService.validate(dto.email)
        }
        catch(err){
          console.log(err) 
        }
    }

}
