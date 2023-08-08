import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from './user.model';
import { Model } from 'mongoose';
import { CreateUserDto } from '@app/common';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserModel>,
  ) {}

  findOneById(id: string) {
    return this.userModel.findById(id);
  }

  async findOneByUsername(username: string) {
    console.log('FIND ONE BY USERNAME "CALLED" WITH', username);
    const user = await this.userModel.findOne({ username });
    console.log({ user });

    if (!user) return { id: null, password: null, username: null };
    return user;
  }

  findAll() {
    return this.userModel.find({});
  }

  createUser(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  async removeOne(id: string) {
    const result = await this.userModel.deleteOne({ id });
    return { count: result.deletedCount, hasDeleted: result.acknowledged };
  }
}
