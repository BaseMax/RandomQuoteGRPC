import { faker } from '@faker-js/faker';
import mongoose, { model } from 'mongoose';
import * as bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userService = model('usermodels', UserSchema);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/user-service');

  const createUserDto = {
    username: faker.internet.userName(),
    password: faker.internet.password(),
  };
  const rawPassword = createUserDto.password;

  const salt = await bcrypt.genSalt(12);
  createUserDto.password = await bcrypt.hash(createUserDto.password, salt);

  const user = new userService(createUserDto);
  await user.save();
  console.log({ ...createUserDto, password: rawPassword });

  console.log('User created successfully!');
  return 0;
}

main();
