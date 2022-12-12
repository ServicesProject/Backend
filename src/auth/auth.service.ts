import { Injectable } from '@nestjs/common';
import { TokenService } from 'src/token/token.service';
import { UserService } from 'src/user/user.service';
import {JwtService} from '@nestjs/jwt'

@Injectable()
export class AuthService {
  
  constructor( 
    private userService:UserService,
    private tokenService:TokenService,
    private readonly jwtService: JwtService
  ){}

  public async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if(user){
      if(user.password === password)
      {
        const payload = {
          sub: user.id,
          role: user.rol,
          email: user.email,
        }
        /*let resp = this.tokenService.getToken(user)*/
        const token = await this.jwtService.sign(payload)
        return {token}
      }
    }
    return null
  }

}
