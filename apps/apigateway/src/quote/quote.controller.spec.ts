import { Test, TestingModule } from '@nestjs/testing';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_PORT, QUOTE_PORT } from '@app/common/constants';
import { AUTH_PACKAGE_NAME, QUOTE_PACKAGE_NAME } from '@app/common';
import { join } from 'path';

describe('QuoteController', () => {
  let controller: QuoteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          {
            name: 'QUOTE_PACKAGE',
            transport: Transport.GRPC,
            options: {
              url: `0.0.0.0:${QUOTE_PORT}`,
              package: QUOTE_PACKAGE_NAME,
              protoPath: join(__dirname, '/../../../../proto/quote.proto'),
            },
          },
        ]),
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
      controllers: [QuoteController],
      providers: [QuoteService],
    }).compile();

    controller = module.get<QuoteController>(QuoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
