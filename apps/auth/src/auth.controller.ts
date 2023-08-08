import {
  AuthServiceController,
  AuthServiceControllerMethods,
  AuthToken,
  LoginDto,
} from '@app/common';
import { Controller } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly authService: AuthService) {}
  login(
    request: LoginDto,
  ): AuthToken | Promise<AuthToken> | Observable<AuthToken> {
    return this.authService.login(request);
  }
}
