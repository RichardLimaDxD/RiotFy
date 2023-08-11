import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { AuthRequest } from './authContext.interface';

export const UserDecorator = createParamDecorator(
  (data: unknown, context: ExecutionContext): any => {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    return request.user;
  },
);
