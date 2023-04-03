import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DataSource } from 'typeorm';
import { TokenService } from 'src/token/token.service';
import { TokenController } from 'src/token/token.controller';
import { AuthService } from 'src/auth/auth.service';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/strategies/jwt.strategy';

import { SharedUsersModule } from 'src/shared/shared-users/shared-users.module';


@Module({
  imports: [
  SharedUsersModule
],
  
})
export class UserModule {
  

}
