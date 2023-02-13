import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JWT_SECRET } from 'src/config/constants';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
  private readonly userService: UserService
   

  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET
    });
  }

  async validate(email:string, password:string) {
    const user = await this.userService.findByEmail(email)
    if( user.password === password)
    {
        return user
    }
    return null;
  }
}