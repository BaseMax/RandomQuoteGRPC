import { NestFactory } from '@nestjs/core';
import { QuoteModule } from './quote.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { QUOTE_PACKAGE_NAME } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    QuoteModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../quote.proto'), // configure in nest-cli assets
        package: QUOTE_PACKAGE_NAME,
      },
    },
  );
  await app.listen();
}
bootstrap();
