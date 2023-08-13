import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from './user.model';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, User, Users } from '@app/common';
import {
  GrpcInvalidArgumentException,
  GrpcNotFoundException,
} from 'nestjs-grpc-exceptions';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserModel>,
  ) {}

  async findOneById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) throw new GrpcNotFoundException('user not found');
    return user;
    // return {
    //   id: user.id,
    //   username: user.username,
    //   role: user.role,
    //   password: user.password,
    // };
  }

  async findOneByUsername(username: string) {
    const user = await this.userModel.findOne({ username });

    console.log('FIND BY USERNAME');

    if (!user)
      throw new GrpcNotFoundException('no user with this username found');
    return user;
  }

  async findAll(): Promise<Users> {
    const users = await this.userModel.find(
      {},
      { id: 1, role: 1, username: 1 },
    );
    return { users };
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const isUserExist = await this.findOneByUsername(createUserDto.username);
    if (isUserExist)
      throw new GrpcInvalidArgumentException('username has already taken');
    const salt = await bcrypt.genSalt(12);
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
    const user = await this.userModel.create(createUserDto);
    return {
      id: user.id,
      username: user.username,
      password: user.password,
      role: user.role,
    };
  }

  async removeOne(id: string) {
    const result = await this.userModel.deleteOne({ _id: id });
    return { count: result.deletedCount, hasDeleted: result.acknowledged };
  }
}
