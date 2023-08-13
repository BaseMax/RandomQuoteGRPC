import { SetMetadata } from '@nestjs/common';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    console.log('IN ROLES_GUARD');

    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const hasRole = () => roles.some((role) => role == user.role);
    console.log({ user, roles, userRoles: user.roles, has: hasRole() });

    return hasRole();
  }
}
export const Roles = (...roles: number[]) => SetMetadata('roles', roles);
