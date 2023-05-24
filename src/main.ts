import { ConfigService } from '@nestjs/config/dist';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from './config/constants';
import { SERVER_PORT } from './config/constants';

async function bootstrap() {
  console.log('***********************************');
  console.log(process.env.SERVER_PORT);
  console.log(DB_HOST)
  console.log('***********************************');
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.SERVER_PORT || 3000);

}
bootstrap();
