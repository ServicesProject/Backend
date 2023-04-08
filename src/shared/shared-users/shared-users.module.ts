import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { JWT_SECRET } from 'src/config/constants';
import { LenderController } from 'src/lender/lender.controller';
import { LenderEntity } from 'src/lender/lender.entity';
import { LenderService } from 'src/lender/lender.service';
import { MailServiceService } from 'src/mailer/mail-service/mail-service.service';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { TokenController } from 'src/token/token.controller';
import { TokenEntity } from 'src/token/token.entity';
import { TokenService } from 'src/token/token.service';
import { UserController } from 'src/user/user.controller';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { DataSource } from 'typeorm';


@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, TokenEntity, LenderEntity]), 
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
    }),], 
    providers: [LenderService, UserService, TokenService, ConfigService,  AuthService, JwtStrategy, MailServiceService],
    exports: [PassportModule,TokenService, UserService, LenderService],
    controllers: [UserController, TokenController, LenderController],
})
export class SharedUsersModule {
    constructor(private dataSource: DataSource){}
}
