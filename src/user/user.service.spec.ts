import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { EntityManager } from '@mikro-orm/postgresql';
import { User } from './user.entity';

describe('UserService', () => {
  let userService: UserService;
  const mockEntityManager = {
    findOne: jest.fn(),
    persistAndFlush: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: EntityManager, useValue: mockEntityManager },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const newUser = new User();
      newUser.uid = 'uid';

      await userService.register('uid');

      expect(mockEntityManager.persistAndFlush).toHaveBeenCalledWith(newUser);
    });
  });

  describe('saveLogin', () => {
    it('should update latest login date for existing user', async () => {
      const existingUser = new User();
      existingUser.uid = 'uid';

      mockEntityManager.findOne.mockResolvedValue(existingUser);

      await userService.saveLogin('uid');

      expect(mockEntityManager.persistAndFlush).toHaveBeenCalledWith(
        existingUser,
      );
    });
  });
});
