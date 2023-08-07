import { Injectable } from '@nestjs/common';

@Injectable()
export class QuoteService {
  getHello(): string {
    return 'Hello World!';
  }
}
