import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './user.model';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([
          { name: UserModel.name, schema: UserSchema },
        ]),
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/test'),
      ],
      providers: [UserService],
    }).compile();

    userService = module.get(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('findOneById', () => {
    it('should be defined', () => {
      expect(userService.findOneById).toBeDefined();
    });
  });

  describe('remove', () => {
    it('should be defined', () => {
      expect(userService.removeOne).toBeDefined();
    });
  });

  describe('findOneByUsername', () => {
    it('should be defined', () => {
      expect(userService.findOneByUsername).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(userService.findAll).toBeDefined();
    });
  });

  describe('createOne', () => {
    it('should be defined', () => {
      expect(userService.createUser).toBeDefined();
    });
  });
});
