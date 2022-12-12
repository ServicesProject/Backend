import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('token')
export class TokenController {

    constructor(
        private authenticationService: AuthService,
        ) {}

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

}
