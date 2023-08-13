import { Module } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QUOTE_PACKAGE_NAME } from '@app/common';
import { join } from 'path';
import { AuthModule } from '../auth/auth.module';
import { QUOTE_PORT } from '@app/common/constants';

@Module({
  imports: [
    AuthModule,
    ClientsModule.register([
      {
        name: 'QUOTE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: `0.0.0.0:${QUOTE_PORT}`,
          package: QUOTE_PACKAGE_NAME,
          protoPath: join(__dirname, '../../auth/quote.proto'),
        },
      },
    ]),
  ],
  controllers: [QuoteController],
  providers: [QuoteService],
})
export class QuoteModule {}
