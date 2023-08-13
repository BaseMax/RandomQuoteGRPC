import { Test, TestingModule } from '@nestjs/testing';
import { QuoteService } from './quote.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuoteModel, QuoteSchema } from './quote.model';

describe('QUOTE SERVICE', () => {
  let quoteService: QuoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([
          { name: QuoteModel.name, schema: QuoteSchema },
        ]),
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/test'),
      ],
      providers: [QuoteService],
    }).compile();

    quoteService = module.get(QuoteService);
  });

  it('should be defined', () => {
    expect(quoteService).toBeDefined();
  });

  describe('remove quote', () => {
    it('should be defined', () => {
      expect(quoteService.removeQuoteById).toBeDefined();
    });
  });

  describe('create quote', () => {
    it('should be defined', () => {
      expect(quoteService.createQuote).toBeDefined();
    });
  });

  describe('findOne quote', () => {
    it('should be defined', () => {
      expect(quoteService.findOne).toBeDefined();
    });
  });

  describe('findRandom quote', () => {
    it('should be defined', () => {
      expect(quoteService.findRandom).toBeDefined();
    });
  });

  describe('update quote', () => {
    it('should be defined', () => {
      expect(quoteService.updateQuote).toBeDefined();
    });
  });
});
