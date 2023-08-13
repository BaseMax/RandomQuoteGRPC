import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { API_PORT } from '@app/common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(API_PORT);
}
bootstrap();
