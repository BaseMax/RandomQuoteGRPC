/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export interface AuthToken {
  token: string;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  password: string;
  role: string;
}

export const AUTH_PACKAGE_NAME = 'auth';

export interface AuthServiceClient {
  login(request: LoginDto): Observable<AuthToken>;

  register(request: RegisterDto): Observable<AuthToken>;
}

export interface AuthServiceController {
  login(
    request: LoginDto,
  ): Promise<AuthToken> | Observable<AuthToken> | AuthToken;

  register(
    request: RegisterDto,
  ): Promise<AuthToken> | Observable<AuthToken> | AuthToken;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['login', 'register'];
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
