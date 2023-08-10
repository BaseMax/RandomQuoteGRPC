import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseInterceptors(GrpcToHttpInterceptor)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
