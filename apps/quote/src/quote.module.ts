import { Module } from '@nestjs/common';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';

@Module({
  imports: [],
  controllers: [QuoteController],
  providers: [QuoteService],
})
export class QuoteModule {}
