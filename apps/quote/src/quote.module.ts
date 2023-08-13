import { Module } from '@nestjs/common';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuoteModel, QuoteSchema } from './quote.model';
import { APP_FILTER } from '@nestjs/core';
import { GrpcServerExceptionFilter } from 'nestjs-grpc-exceptions';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/quote-service'),
    MongooseModule.forFeature([{ name: QuoteModel.name, schema: QuoteSchema }]),
  ],
  controllers: [QuoteController],
  providers: [
    QuoteService,
    {
      provide: APP_FILTER,
      useClass: GrpcServerExceptionFilter,
    },
  ],
})
export class QuoteModule {}
