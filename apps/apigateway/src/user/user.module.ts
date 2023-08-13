import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USER_PACKAGE_NAME } from '@app/common';
import { join } from 'path';
import { AuthModule } from '../auth/auth.module';
import { USER_PORT } from '@app/common/constants';

@Module({
  imports: [
    AuthModule,
    ClientsModule.register([
      {
        name: 'USER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: `0.0.0.0:${USER_PORT}`,
          package: USER_PACKAGE_NAME,
          protoPath: join(__dirname, '../../auth/user.proto'),
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
