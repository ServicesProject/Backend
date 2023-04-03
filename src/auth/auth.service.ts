import { Injectable } from '@nestjs/common';
import { TokenService } from 'src/token/token.service';
import { UserService } from 'src/user/user.service';
import {JwtService} from '@nestjs/jwt'
import { RolType } from 'src/rol/rol.enum';
import { LenderService } from 'src/lender/lender.service';

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
          
          let token = this.tokenService.getToken(user)
        
          return {token}
        }
      }else{
        const lender = await this.lenderService.findByEmailLender(email)
        if(user.password === password)
        {
        
          let token = this.tokenService.getToken(lender)
      
          return {token}
        }
      }
      
    }
    return null
  }

}
