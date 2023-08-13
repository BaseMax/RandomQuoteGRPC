import {
  CreateQuoteDto,
  FindOneQuoteByIdDto,
  FindOneUserByIdDto,
  Quote,
  UpdateQuoteCount,
  UpdateQuoteDto,
} from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QuoteModel } from './quote.model';
import { Model } from 'mongoose';
import { GrpcNotFoundException } from 'nestjs-grpc-exceptions';

@Injectable()
export class QuoteService {
  @InjectModel(QuoteModel.name) private quoteModel: Model<QuoteModel>;

  async findOne(dto: FindOneQuoteByIdDto) {
    const quote = await this.quoteModel.findById(dto.id);
    if (!quote) throw new GrpcNotFoundException('quote not found');
    return { id: quote.id, author: quote.author, content: quote.content };
  }

  async createQuote(createQuoteDto: CreateQuoteDto) {
    return this.quoteModel.create(createQuoteDto);
  }

  async removeQuoteById(dto: FindOneUserByIdDto) {
    const result = await this.quoteModel.deleteOne({ _id: dto.id });
    return {
      count: result.deletedCount,
      hasDeleted: result.acknowledged,
    };
  }

  async updateQuote(updateDto: UpdateQuoteDto): Promise<UpdateQuoteCount> {
    const quote = await this.quoteModel.updateOne(
      { _id: updateDto.id },
      updateDto,
    );
    return {
      count: quote.matchedCount,
      hasUpdated: quote.acknowledged,
    };
  }

  async findRandom(): Promise<Quote> {
    const result = await this.quoteModel.aggregate([{ $sample: { size: 1 } }]);
    return result[0];
  }
}
