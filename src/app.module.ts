import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserModule } from './user/user.module';
import { FirebaseModule } from './firebase/firebase.module';
import config from '../config/mikro-orm.config';

@Module({
  imports: [MikroOrmModule.forRoot(config), UserModule, FirebaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
