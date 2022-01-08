import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtGuard } from 'src/auth/jwt-auth.guard';
import { UserInfoDto } from 'src/user/UserDto';

import { ROLES_KEY, UserRoles } from './roles.decorator';

@Injectable()
export class RolesGuard extends JwtGuard {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<UserRoles[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();

    return requiredRoles.includes(req?.user?.role);
  }
}
