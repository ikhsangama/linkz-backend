import { Injectable } from '@nestjs/common';
import {EntityManager} from "@mikro-orm/postgresql";
import {User} from "./user.entity";

@Injectable()
export class UserService {
    constructor(private readonly em: EntityManager) {}

    async register(uid: string): Promise<User> {
        const user = new User();
        user.uid = uid;
        user.latestLogin = new Date();

        await this.em.persistAndFlush(user);
        return user;
    }

    async saveLogin(uid: string): Promise<User> {
        const user = await this.em.findOne(User, {uid});
        if (user) {
            user.latestLogin = new Date();
            await this.em.persistAndFlush(user);
            return user;
        }
    }
}
