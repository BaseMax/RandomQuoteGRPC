import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { QUOTE_SERVICE_NAME, QuoteServiceClient } from '@app/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class QuoteService implements OnModuleInit {
  private quoteService: QuoteServiceClient;

  constructor(@Inject('QUOTE_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.quoteService =
      this.client.getService<QuoteServiceClient>(QUOTE_SERVICE_NAME);
  }
  create(createQuoteDto: CreateQuoteDto) {
    return this.quoteService.createQuote(createQuoteDto);
  }

  findRandom() {
    return this.quoteService.randDomQuote({});
  }

  findOne(id: string) {
    return this.quoteService.findOneQuoteById({ id });
  }

  update(id: string, updateQuoteDto: UpdateQuoteDto) {
    return this.quoteService.updateQuote({ id, ...updateQuoteDto });
  }

  remove(id: string) {
    return this.quoteService.removeQuoteById({ id });
  }
}
