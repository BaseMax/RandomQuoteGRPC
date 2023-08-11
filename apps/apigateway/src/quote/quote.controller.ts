import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { QuoteService } from './quote.service';
import { CreateQuoteDto, UpdateQuoteDto } from './dto';
import { Quote, RemoveQuoteCount, UpdateQuoteCount } from '@app/common';
import { Observable } from 'rxjs';

@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Get('random')
  randDomQuote(): Quote | Promise<Quote> | Observable<Quote> {
    return this.quoteService.findRandom();
  }

  @Get(':id')
  findOneQuoteById(
    @Param('id') id: string,
  ): Quote | Promise<Quote> | Observable<Quote> {
    return this.quoteService.findOne(id);
  }

  @Post()
  createQuote(
    @Body() request: CreateQuoteDto,
  ): Quote | Promise<Quote> | Observable<Quote> {
    return this.quoteService.create(request);
  }

  @Delete(':id')
  removeQuoteById(
    @Param('id') id: string,
  ):
    | RemoveQuoteCount
    | Promise<RemoveQuoteCount>
    | Observable<RemoveQuoteCount> {
    return this.quoteService.remove(id);
  }

  @Put(':id')
  updateQuote(
    @Param('id') id: string,
    @Body() request: UpdateQuoteDto,
  ):
    | UpdateQuoteCount
    | Promise<UpdateQuoteCount>
    | Observable<UpdateQuoteCount> {
    return this.quoteService.update(id, request);
  }
}
