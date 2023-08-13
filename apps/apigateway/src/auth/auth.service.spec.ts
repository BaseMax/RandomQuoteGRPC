import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_PORT } from '@app/common/constants';
import { AUTH_PACKAGE_NAME } from '@app/common';
import { join } from 'path';

describe('AuthService', () => {
  let service: AuthService;

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
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
