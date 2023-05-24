
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('***********************************');
  console.log(process.env.SERVER_PORT);
  console.log(process.env.DB_HOST);
  console.log(process.env.DB_DATABASE);
  console.log(process.env.DB_PORT);
  console.log(process.env.DB_USER);

  console.log('***********************************');
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.SERVER_PORT || 3000);

}
bootstrap();
