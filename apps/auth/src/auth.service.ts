import {
  AuthToken,
  AuthUser,
  LoginDto,
  USERS_SERVICE_NAME,
  UsersServiceClient,
} from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { signToken, verifyToken } from './jwt';
import { GrpcUnauthenticatedException } from 'nestjs-grpc-exceptions';
import { IJwtPayload } from './interfaces';

@Injectable()
export class AuthService implements OnModuleInit {
  private usersService: UsersServiceClient;

  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.usersService =
      this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await lastValueFrom(
      this.usersService.findOneUserByUsername({ username }),
    );

    if (!user.username)
      throw new GrpcUnauthenticatedException('wrong credentials');

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      throw new GrpcUnauthenticatedException('wrong credentials');

    const payload = { username };
    const token = await signToken(payload);

    return { token };
  }

  async verifyAccessToken(request: AuthToken): Promise<AuthUser> {
    try {
      const result = (await verifyToken(request.token)) as IJwtPayload;

      const user = await lastValueFrom(
        this.usersService.findOneUserByUsername({
          username: result.username,
        }),
      );
      return { id: user.id, username: user.username, role: user.role };
    } catch (error) {
      throw new GrpcUnauthenticatedException('invalid token');
    }
  }
}
