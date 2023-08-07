import { Test, TestingModule } from '@nestjs/testing';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';

describe('QuoteController', () => {
  let quoteController: QuoteController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [QuoteController],
      providers: [QuoteService],
    }).compile();

    quoteController = app.get<QuoteController>(QuoteController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(quoteController.getHello()).toBe('Hello World!');
    });
  });
});
