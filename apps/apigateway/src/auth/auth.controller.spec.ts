import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_PORT } from '@app/common/constants';
import { AUTH_PACKAGE_NAME } from '@app/common';
import { join } from 'path';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          {
            name: 'AUTH_PACKAGE',
            transport: Transport.GRPC,
            options: {
              url: `0.0.0.0:${AUTH_PORT}`,
              package: AUTH_PACKAGE_NAME,
              protoPath: join(__dirname, '/../../../../proto/auth.proto'),
            },
          },
        ]),
      ],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
