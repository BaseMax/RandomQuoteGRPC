import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AUTH_PACKAGE_NAME } from '@app/common';
import { AuthModule } from './auth.module';
import { AUTH_PORT } from '@app/common/constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `0.0.0.0:${AUTH_PORT}`,
        protoPath: join(__dirname, '../../auth/auth.proto'), // configure in nest-cli assets
        package: AUTH_PACKAGE_NAME,
      },
    },
  );
  await app.listen();
}
bootstrap();
