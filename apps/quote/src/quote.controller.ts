import { Controller, Get } from '@nestjs/common';
import { QuoteService } from './quote.service';

@Controller()
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Get()
  getHello(): string {
    return this.quoteService.getHello();
  }
}
