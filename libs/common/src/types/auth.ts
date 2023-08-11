/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export interface AuthUser {
  id: string;
  username: string;
}

export interface AuthToken {
  token: string;
}

export interface LoginDto {
  username: string;
  password: string;
}

export const AUTH_PACKAGE_NAME = 'auth';

export interface AuthServiceClient {
  login(request: LoginDto): Observable<AuthToken>;

  verifyAccessToken(request: AuthToken): Observable<AuthUser>;
}

export interface AuthServiceController {
  login(
    request: LoginDto,
  ): Promise<AuthToken> | Observable<AuthToken> | AuthToken;

  verifyAccessToken(
    request: AuthToken,
  ): Promise<AuthUser> | Observable<AuthUser> | AuthUser;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['login', 'verifyAccessToken'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('AuthService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('AuthService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const AUTH_SERVICE_NAME = 'AuthService';
