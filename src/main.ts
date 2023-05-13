import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  const serverPort: number = parseInt(process.env.SERVER_PORT, 10);
  const port: number = configService.get<number>('SERVER_PORT', serverPort);


  await app.listen(port);
}

bootstrap();
