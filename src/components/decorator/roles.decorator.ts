import { ENUM_UserRole } from '@constants/enum';
import { SetMetadata } from '@nestjs/common';

export const Roles = (...args: ENUM_UserRole[]) => SetMetadata('roles', args);
