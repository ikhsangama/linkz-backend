import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from './user.entity';

jest.mock('./user.service');

describe('UserController', () => {
  let userService: UserService;
  let userController: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
    userController = module.get<UserController>(UserController);
  });

  describe('register', () => {
    it('should register a user and return the registered user', async () => {
      const result = new User();
      result.uid = '123';
      result.latestLogin = new Date();

      jest
        .spyOn(userService, 'register')
        .mockImplementation(() => Promise.resolve(result));
      expect(await userController.register('123')).toBe(result);
    });
  });

  describe('login', () => {
    it('should login a registered user and return the logged user', async () => {
      const result = new User();
      result.uid = '123';
      result.latestLogin = new Date();

      jest
        .spyOn(userService, 'saveLogin')
        .mockImplementation(() => Promise.resolve(result));
      expect(await userController.login('123')).toBe(result);
    });
  });
});
