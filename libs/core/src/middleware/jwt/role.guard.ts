import type { CanActivate, ExecutionContext, Type } from '@nestjs/common';
import { mixin } from '@nestjs/common';

const RoleGuard = (allowedRoles: string[]): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const arrOfUserRoles = context.switchToHttp().getRequest().raw.roles;

      if (!arrOfUserRoles) return false;
      const setOfUserRoles = new Set(arrOfUserRoles);

      let isAllowed = false;
      for (let i = 0; i < allowedRoles.length; i += 1) {
        if (setOfUserRoles.has(allowedRoles[i])) {
          isAllowed = true;
          break;
        }
      }

      return isAllowed;
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
