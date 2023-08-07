import { NestFactory } from '@nestjs/core';
import { QuoteModule } from './quote.module';

async function bootstrap() {
  const app = await NestFactory.create(QuoteModule);
  await app.listen(3000);
}
bootstrap();
