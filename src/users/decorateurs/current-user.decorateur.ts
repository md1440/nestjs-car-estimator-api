import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// *** Request is pre-modified through curret-user.interceptor
export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
