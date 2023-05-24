import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from './config/constants';
import { UserModule } from './user/user.module';

import { WorkModule } from './work/work.module';
import { RolModule } from './rol/rol.module';
import { GuardModule } from './guard/guard.module';
import { LenderModule } from './lender/lender.module';
import { SharedUsersModule } from './shared/shared-users/shared-users.module';

import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailServiceService } from './mailer/mail-service/mail-service.service';
import { RatingModule } from './rating/rating.module';
import { NotificationModule } from './notification/notification.module';


@Module({
  imports: [
    
    ConfigModule.forRoot({ 
    envFilePath: '.env', 
    isGlobal: true,
    }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'smtp-mail.outlook.com',
          service: 'smtp-mail.outlook.com',
          port: 587,
          secure: false,
          tls: {
            rejectUnauthorized: false
          },
          auth: {
            user: 'nexa.bolivia@outlook.com',
            pass: 'nexanexa38',
          },
        },
        defaults: {
          from: `"Nexa" <${
            'nexa.bolivia@outlook.com'
          }>`,
        },
        template: {
          dir: __dirname + '/mailer/template',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }), 
  TypeOrmModule.forRootAsync({
    useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: false,
      }),
      inject: [ConfigService],
  }),
  UserModule,
  WorkModule,
  RolModule,
  GuardModule,
  LenderModule,
  SharedUsersModule,
  RatingModule,
  NotificationModule
],
  controllers: [AppController],
  providers: [AppService, MailServiceService],
})
export class AppModule {
}
