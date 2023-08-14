import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const token = ctx.getArgByIndex(2).token.split(' ')[1];
    if (token) {
      const res = await admin.auth().verifyIdToken(token);
      if (res) return true;
    }
    return false;
  }
}
