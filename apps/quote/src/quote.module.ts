import { Module } from '@nestjs/common';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuoteModel, QuoteSchema } from './quote.model';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/quote-service'),
    MongooseModule.forFeature([{ name: QuoteModel.name, schema: QuoteSchema }]),
  ],
  controllers: [QuoteController],
  providers: [QuoteService],
})
export class QuoteModule {}
