import { Test, TestingModule } from '@nestjs/testing';
import { QuoteService } from './quote.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QUOTE_PORT } from '@app/common/constants';
import { QUOTE_PACKAGE_NAME } from '@app/common';
import { join } from 'path';

describe('QuoteService', () => {
  let service: QuoteService;

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
      ],
      providers: [QuoteService],
    }).compile();

    service = module.get<QuoteService>(QuoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
