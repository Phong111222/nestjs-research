import { SetMetadata } from '@nestjs/common';

export enum UserRoles {
  ADMIN = 'admin',
  USER = 'user',
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRoles[]) => SetMetadata(ROLES_KEY, roles);
