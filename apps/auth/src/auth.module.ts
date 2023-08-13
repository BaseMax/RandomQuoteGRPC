import { USER_PACKAGE_NAME } from '@app/common';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { APP_FILTER } from '@nestjs/core';
import { GrpcServerExceptionFilter } from 'nestjs-grpc-exceptions';
import { USER_PORT } from '@app/common/constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: `0.0.0.0:${USER_PORT}`,
          package: USER_PACKAGE_NAME,
          protoPath: join(__dirname, '../user.proto'),
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_FILTER,
      useClass: GrpcServerExceptionFilter,
    },
  ],
})
export class AuthModule {}
