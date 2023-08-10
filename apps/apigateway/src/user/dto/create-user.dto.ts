import { CreateUserDto as ICreateUserDto } from '@app/common';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto implements ICreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
