import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USER_PORT } from '@app/common/constants';
import { USER_PACKAGE_NAME } from '@app/common';
import { join } from 'path';

describe('UserService', () => {
  let service: UserService;

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
              protoPath: join(__dirname, '/../../../../proto/user.proto'),
            },
          },
        ]),
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
