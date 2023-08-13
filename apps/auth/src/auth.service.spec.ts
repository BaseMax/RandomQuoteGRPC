import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USER_PORT } from '@app/common/constants';
import { USER_PACKAGE_NAME } from '@app/common';
import { join } from 'path';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          {
            name: 'USER_PACKAGE',
            transport: Transport.GRPC,
            options: {
              url: `0.0.0.0:${USER_PORT}`,
              package: USER_PACKAGE_NAME,
              protoPath: join(__dirname, '../../../proto/user.proto'),
            },
          },
        ]),
      ],
      providers: [AuthService],
    }).compile();

    authService = module.get(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    it('should be defined', () => {
      expect(authService.login).toBeDefined();
    });
  });

  describe('verify access token', () => {
    it('should be defined', () => {
      expect(authService.verifyAccessToken).toBeDefined();
    });
  });
});
