import { Controller } from '@nestjs/common';
import { QuoteService } from './quote.service';
import {
  CreateQuoteDto,
  FindOneQuoteByIdDto,
  Quote,
  QuoteServiceController,
  QuoteServiceControllerMethods,
  RemoveQuoteCount,
  UpdateQuoteCount,
  UpdateQuoteDto,
} from '@app/common';
import { Observable } from 'rxjs';

@Controller()
@QuoteServiceControllerMethods()
export class QuoteController implements QuoteServiceController {
  constructor(private readonly quoteService: QuoteService) {}
  findOneQuoteById(
    request: FindOneQuoteByIdDto,
  ): Quote | Promise<Quote> | Observable<Quote> {
    return this.quoteService.findOne(request);
  }
  createQuote(
    request: CreateQuoteDto,
  ): Quote | Promise<Quote> | Observable<Quote> {
    return this.quoteService.createQuote(request);
  }
  removeQuoteById(
    request: FindOneQuoteByIdDto,
  ):
    | RemoveQuoteCount
    | Promise<RemoveQuoteCount>
    | Observable<RemoveQuoteCount> {
    return this.quoteService.removeQuoteById(request);
  }

  updateQuote(
    request: UpdateQuoteDto,
  ):
    | UpdateQuoteCount
    | Promise<UpdateQuoteCount>
    | Observable<UpdateQuoteCount> {
    return this.quoteService.updateQuote(request);
  }
}
