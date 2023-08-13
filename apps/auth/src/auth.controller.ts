import {
  AuthServiceController,
  AuthServiceControllerMethods,
  AuthToken,
  AuthUser,
  LoginDto,
} from '@app/common';
import { Controller } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly authService: AuthService) {}
  verifyAccessToken(
    request: AuthToken,
  ): AuthUser | Observable<AuthUser> | Promise<AuthUser> {
    return this.authService.verifyAccessToken(request);
  }
  login(
    request: LoginDto,
  ): AuthToken | Promise<AuthToken> | Observable<AuthToken> {
    console.log('LOGIN CONTROLLER');

    return this.authService.login(request);
  }
}
