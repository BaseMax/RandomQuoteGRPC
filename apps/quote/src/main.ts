import { NestFactory } from '@nestjs/core';
import { QuoteModule } from './quote.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { QUOTE_PACKAGE_NAME } from '@app/common';
import { QUOTE_PORT } from '@app/common/constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    QuoteModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `0.0.0.0:${QUOTE_PORT}`,
        protoPath: join(__dirname, '../../auth/quote.proto'), // configure in nest-cli assets
        package: QUOTE_PACKAGE_NAME,
      },
    },
  );
  await app.listen();
}
bootstrap();
