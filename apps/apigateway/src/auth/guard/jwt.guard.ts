import { AUTH_SERVICE_NAME, AuthServiceClient } from '@app/common';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Request } from 'express';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class JwtGuard implements CanActivate, OnModuleInit {
  private authService: AuthServiceClient;

  constructor(@Inject('AUTH_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.authService =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const token = this.extractToken(context);

    if (!token) throw new UnauthorizedException('invalid token');

    try {
      // send token to auth service and verified token and return user
      const user = await lastValueFrom(
        this.authService.verifyAccessToken({ token }),
      );

      console.log({ user });

      this.attachPayload(context, user);
    } catch {
      throw new UnauthorizedException('invalid token');
    }

    return true;
  }
  private attachPayload(context: ExecutionContext, payload: any) {
    context.switchToHttp().getRequest().user = payload;
  }

  private extractToken(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    return this.extractTokenFromHeader(request);
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    console.log({ token, type, t: request.headers.authorization });

    return type === 'Bearer' ? token : undefined;
  }
}
