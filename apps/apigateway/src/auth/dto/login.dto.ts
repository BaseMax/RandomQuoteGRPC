import { LoginDto as ILoginDto } from '@app/common';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto implements ILoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
