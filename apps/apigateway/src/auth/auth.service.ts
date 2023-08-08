import { AUTH_SERVICE_NAME, AuthServiceClient, LoginDto } from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class AuthService implements OnModuleInit {
  private authService: AuthServiceClient;

  constructor(@Inject('AUTH_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.authService =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  login(loginDto: LoginDto) {
    console.log('[LOGIN SERVICE API]: dto', { loginDto });
    return this.authService.login(loginDto);
  }
}
