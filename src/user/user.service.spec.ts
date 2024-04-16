import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { EntityManager } from '@mikro-orm/postgresql';
import { User } from './user.entity';
import { FirebaseService } from '../firebase/firebase.service';

function MockFirebaseService() {
  // Return a mock instance of your FirebaseService
  let uid = null;

  return {
    getAuth: () => ({
      getUser: (uid) => {
        return new Promise((resolve, reject) => {
          if (uid === null) {
            reject('no uid');
          } else {
            resolve({ uid });
          }
        });
      }
    }),

    setUid: (newUid) => {
      uid = newUid;
    },
  }
}

expect.extend({
  toBeWithinSecondsOf(received, expected, seconds = 1) {
    const diff = Math.abs(received.getTime() - expected.getTime()) / 1000;
    const pass = diff < seconds;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within ${seconds} seconds of ${expected}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within ${seconds} seconds of ${expected}`,
        pass: false,
      };
    }
  }
});

describe('UserService', () => {
  let userService: UserService;
  let mockFirebaseService;

  const mockEntityManager = {
    findOne: jest.fn(),
    persistAndFlush: jest.fn(),
  };

  beforeEach(async () => {
    mockFirebaseService = MockFirebaseService();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: FirebaseService, useValue: mockFirebaseService },
        { provide: EntityManager, useValue: mockEntityManager },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const newUser = new User();
      newUser.uid = 'valid-uid';

      mockFirebaseService.setUid('valid-uid');
      await userService.register('valid-uid');

      expect(mockEntityManager.persistAndFlush).toHaveBeenCalledWith(
        expect.objectContaining({
          uid: 'valid-uid',
        })
      );
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
