import {
  CreateQuoteDto,
  FindOneQuoteByIdDto,
  FindOneUserByIdDto,
  UpdateQuoteCount,
  UpdateQuoteDto,
} from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QuoteModel } from './quote.model';
import { Model } from 'mongoose';

@Injectable()
export class QuoteService {
  @InjectModel(QuoteModel.name) private quoteModel: Model<QuoteModel>;

  async findOne(dto: FindOneQuoteByIdDto) {
    return this.quoteModel.findById(dto.id);
  }

  async createQuote(createQuoteDto: CreateQuoteDto) {
    return this.quoteModel.create(createQuoteDto);
  }

  async removeQuoteById(dto: FindOneUserByIdDto) {
    const result = await this.quoteModel.deleteOne({ id: dto.id });
    return {
      count: result.deletedCount,
      hasDeleted: result.acknowledged,
    };
  }

  async updateQuote(updateDto: UpdateQuoteDto): Promise<UpdateQuoteCount> {
    const quote = await this.quoteModel.updateOne(
      { id: updateDto.id },
      updateDto,
    );
    return {
      count: quote.matchedCount,
      hasUpdated: quote.acknowledged,
    };
  }

  async findRandom() {
    const result = await this.quoteModel.aggregate([{ $sample: { size: 1 } }]);
    return result[0];
  }
}
