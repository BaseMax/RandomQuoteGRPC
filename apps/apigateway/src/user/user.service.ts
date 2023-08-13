import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { USERS_SERVICE_NAME, UsersServiceClient } from '@app/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class UserService implements OnModuleInit {
  private userService: UsersServiceClient;

  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.userService =
      this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }

  create(createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  findAll() {
    return this.userService.findAllUsers({});
  }

  findOne(id: string) {
    console.log({ id });

    return this.userService.findOneUserById({ id });
  }

  remove(id: string) {
    return this.userService.removeUser({ id });
  }
}
