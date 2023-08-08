/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export interface RemoveUserCount {
  count: number;
  hasDeleted: boolean;
}

export interface FindOneUserByIdDto {
  id: string;
}

export interface FindOneUserByUsernameDto {
  username: string;
}

export interface Empty {}

export interface Users {
  users: User[];
}

export interface CreateUserDto {
  username: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
  password: string;
}

export const USER_PACKAGE_NAME = 'user';

export interface UsersServiceClient {
  createUser(request: CreateUserDto): Observable<User>;

  findAllUsers(request: Empty): Observable<Users>;

  findOneUserById(request: FindOneUserByIdDto): Observable<User>;

  findOneUserByUsername(request: FindOneUserByUsernameDto): Observable<User>;

  removeUser(request: FindOneUserByIdDto): Observable<RemoveUserCount>;
}

export interface UsersServiceController {
  createUser(request: CreateUserDto): Promise<User> | Observable<User> | User;

  findAllUsers(request: Empty): Promise<Users> | Observable<Users> | Users;

  findOneUserById(
    request: FindOneUserByIdDto,
  ): Promise<User> | Observable<User> | User;

  findOneUserByUsername(
    request: FindOneUserByUsernameDto,
  ): Promise<User> | Observable<User> | User;

  removeUser(
    request: FindOneUserByIdDto,
  ): Promise<RemoveUserCount> | Observable<RemoveUserCount> | RemoveUserCount;
}

export function UsersServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'createUser',
      'findAllUsers',
      'findOneUserById',
      'findOneUserByUsername',
      'removeUser',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('UsersService', method)(
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
      GrpcStreamMethod('UsersService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const USERS_SERVICE_NAME = 'UsersService';
