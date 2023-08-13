import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME } from '@app/common';
import { join } from 'path';
import { JwtGuard } from './guard';
import { AUTH_PORT } from '@app/common/constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: `0.0.0.0:${AUTH_PORT}`,
          package: AUTH_PACKAGE_NAME,
          protoPath: join(__dirname, '../../auth/auth.proto'),
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtGuard],
  exports: [
    JwtGuard,
    ClientsModule.register([
      {
        name: 'AUTH_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: `0.0.0.0:${AUTH_PORT}`,
          package: AUTH_PACKAGE_NAME,
          protoPath: join(__dirname, '../../auth/auth.proto'),
        },
      },
    ]),
  ],
})
export class AuthModule {}
