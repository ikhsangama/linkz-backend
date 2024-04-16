import {Body, Controller, Get, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {User} from "./user.entity";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/register')
    async register(@Body('uid') uid: string): Promise<User> {
        return this.userService.register(uid);
    }

    @Post('/login')
    async login(@Body('uid') uid: string): Promise<User> {
        return this.userService.saveLogin(uid);
    }
}
