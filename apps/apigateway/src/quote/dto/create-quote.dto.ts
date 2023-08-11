import { CreateQuoteDto as ICreateQuoteDto } from '@app/common';
import { IsEmpty, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateQuoteDto implements ICreateQuoteDto {
  @IsEmpty()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsOptional()
  author: string;
}
