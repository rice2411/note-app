import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as admin from 'firebase-admin';

export const User = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const user = ctx.getArgByIndex(2).user;
    return JSON.parse(user);
  },
);
