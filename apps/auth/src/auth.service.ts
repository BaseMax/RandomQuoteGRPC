import { LoginDto, USERS_SERVICE_NAME, UsersServiceClient } from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { signToken } from './jwt';

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

    // console.log('USER_SERVICE IN AUTH SVC');
    const user = await lastValueFrom(
      this.usersService.findOneUserByUsername({ username }),
    );

    if (!user.username) return { token: 'wrong' };

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) throw new RpcException('wrong credentials');

    const payload = { username };
    const token = await signToken(payload);

    return { token };
  }
}
