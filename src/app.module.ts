import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from './config/constants';
import { UserModule } from './user/user.module';
import { DataSource } from 'typeorm';
import { WorkModule } from './work/work.module';
import { RolModule } from './rol/rol.module';

@Module({
  imports: [ConfigModule.forRoot({ 
    envFilePath: '.env', 
    isGlobal: true 
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      type: 'mariadb',
      host: configService.get<string>(DB_HOST),
      port: +configService.get<number>(DB_PORT),
      username: configService.get<string>(DB_USER),
      password: configService.get<string>(DB_PASSWORD),
      database: configService.get<string>(DB_DATABASE),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging:true
    }),
    inject: [ConfigService],
  }),
  UserModule,
  WorkModule,
  RolModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
