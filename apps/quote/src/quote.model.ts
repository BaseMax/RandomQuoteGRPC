import { Quote } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type QuoteDocument = HydratedDocument<QuoteModel>;

@Schema()
export class QuoteModel implements Quote {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: false })
  author: string;
}

export const QuoteSchema = SchemaFactory.createForClass(QuoteModel);
