import { IsOptional, IsString } from 'class-validator';
import { CreateQuoteDto } from './create-quote.dto';

export class UpdateQuoteDto implements Partial<CreateQuoteDto> {
  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsOptional()
  author?: string;
}
