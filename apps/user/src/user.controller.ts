import { Controller } from '@nestjs/common';
import {
  CreateUserDto,
  FindOneUserByIdDto,
  FindOneUserByUsernameDto,
  RemoveUserCount,
  User,
  Users,
  UsersServiceController,
  UsersServiceControllerMethods,
} from '@app/common';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Controller()
@UsersServiceControllerMethods()
export class UserController implements UsersServiceController {
  constructor(private readonly userService: UserService) {}
  removeUser(
    request: FindOneUserByIdDto,
  ): RemoveUserCount | Observable<RemoveUserCount> | Promise<RemoveUserCount> {
    return this.userService.removeOne(request.id);
  }
  createUser(request: CreateUserDto): User | Promise<User> | Observable<User> {
    return this.userService.createUser(request);
  }
  async findAllUsers(): Promise<Users> {
    const users = await this.userService.findAll();
    return { users };
  }
  findOneUserById(
    request: FindOneUserByIdDto,
  ): User | Promise<User> | Observable<User> {
    return this.userService.findOneById(request.id);
  }
  findOneUserByUsername(
    request: FindOneUserByUsernameDto,
  ): User | Promise<User> | Observable<User> {
    return this.userService.findOneByUsername(request.username);
  }
}
