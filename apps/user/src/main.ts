import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { USER_PACKAGE_NAME } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:3002',
        protoPath: join(__dirname, '../../auth/user.proto'), // configure in nest-cli assets
        package: USER_PACKAGE_NAME,
      },
    },
  );
  await app.listen();
}
bootstrap();
