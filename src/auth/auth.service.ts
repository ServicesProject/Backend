import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TokenService } from 'src/token/token.service';
import { UserService } from 'src/user/user.service';
import {JwtService} from '@nestjs/jwt'
import { RolType } from 'src/rol/rol.enum';
import { LenderService } from 'src/lender/lender.service';
import { ValidateDto } from 'src/token/dto/validate.dto';
import { Exception } from 'handlebars';

@Injectable()
export class AuthService {
  
  constructor( 
    private userService:UserService,
    private tokenService:TokenService,
    private lenderService: LenderService,
  
  ){}

  public async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    
    if(user){
      if(user.rol === RolType.USER){
        if(user.password === password)
        {
          if(user.accountConfirmed === true){
            let token = this.tokenService.getToken(user)
            return {token}
          }
          throw new HttpException('El correo no se encuentra verificado', HttpStatus.FORBIDDEN)
        }
      }else{
        const lender = await this.lenderService.findByEmailLender(email)
        if(user.password === password)
        {
          if(user.accountConfirmed === true){
            let token = this.tokenService.getToken(lender)
            return {token}
          }
          throw new HttpException('El correo no se encuentra verificado', HttpStatus.FORBIDDEN)
        }
      }
      throw new HttpException('El usuario o contraseña no son correctos', HttpStatus.UNAUTHORIZED)
      
    }
    throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND)
  }

  async validate(email: string){
    this.userService.validateEmailRegister(email)
  }

}
