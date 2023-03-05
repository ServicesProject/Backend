import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { DataSource } from 'typeorm';
import { TokenService } from 'src/token/token.service';
import { TokenEntity } from 'src/token/token.entity';
import { TokenController } from 'src/token/token.controller';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWT_SECRET } from 'src/config/constants';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { LenderModule } from 'src/lender/lender.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, TokenEntity]), 
  PassportModule.register({
    defaultStrategy: 'jwt'
  }),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: JWT_SECRET,
      signOptions:{
        expiresIn: 7200
      }
    }),
    inject: [ConfigService],
  }),
],
  providers: [UserService, TokenService, AuthService, ConfigService, JwtStrategy],
  controllers: [UserController, TokenController],
  exports: [PassportModule,TokenService, UserService]
})
export class UserModule {
  constructor(private dataSource: DataSource){}

}
