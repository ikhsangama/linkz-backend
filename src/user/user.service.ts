import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { User } from './user.entity';
import { FirebaseService } from '../firebase/firebase.service'; // Import your Firebase Service

@Injectable()
export class UserService {
  constructor(
    private readonly em: EntityManager,
    private readonly firebaseService: FirebaseService,
  ) {}

  private async createAndSaveUser(uid: string): Promise<User> {
    const user = new User();
    user.uid = uid;
    user.latestLogin = new Date();
    await this.em.persistAndFlush(user);
    return user;
  }

  async register(uid: string): Promise<User> {
    try {
      await this.firebaseService.getAuth().getUser(uid);
      console.log(`user ${uid} found in firebase, registering the user..`);
      return this.createAndSaveUser(uid);
    } catch (error) {
      throw new BadRequestException(`Invalid uid: ${uid}`);
    }
  }

  async saveLogin(uid: string): Promise<User> {
    const existingUser = await this.em.findOne(User, { uid });
    if (existingUser) {
      existingUser.latestLogin = new Date();
      await this.em.persistAndFlush(existingUser);
      return existingUser;
    }
    console.log(`user ${uid} not found in DB, registering..`);
    try {
      await this.firebaseService.getAuth().getUser(uid);
      console.log(`user ${uid} found in firebase, registering the user..`);
      return this.createAndSaveUser(uid);
    } catch (error) {
      throw new NotFoundException(`User ${uid} not found`);
    }
  }
}
