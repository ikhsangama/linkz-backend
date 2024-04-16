import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import serviceAccount from '../../linkz-f38ce-firebase-adminsdk-pkjwc-c25c5e0460.json';

@Injectable()
export class FirebaseService {
  private readonly app: admin.app.App;

  constructor() {
    this.app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
  }

  getAuth(): admin.auth.Auth {
    return this.app.auth();
  }
}
