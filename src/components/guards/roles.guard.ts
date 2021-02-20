import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthModule } from '@vanilla/auth/auth.module';

@Injectable()
export class RolesGuard implements CanActivate {

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> {
    // get class set roles
    const reflector = new Reflector()
    const jwtService = AuthModule.jwtService

    const rolesClass = reflector.get<UserRole[]>('roles', context.getClass()) || []
    // get endpoint set roles
    const rolesHandler = reflector.get<UserRole[]>('roles', context.getHandler()) || []

    // merge set roles
    const roles = [...new Set([...rolesHandler, ...rolesClass])].filter(Boolean)

    // kalo gk ada role yang di set di endpoint langsung masuk aja
    if (!roles || !roles.length) return true

    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization?.split(' ') || []

    const token = authorization[1] || null
    if (!token) return true

    const loggedUser = jwtService.decode(token) as any;

    if (!loggedUser) throw new UnauthorizedException()

    const loggedUserRole = loggedUser.type
    if (!loggedUserRole) throw new UnauthorizedException()

    const isAnyRoleMatch = roles.find(role => role == loggedUserRole)

    if (isAnyRoleMatch) return true

    return false
  }
}
