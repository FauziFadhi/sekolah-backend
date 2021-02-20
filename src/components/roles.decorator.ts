import { SetMetadata } from '@nestjs/common';

export const Roles = (...args: UserRole[]) => SetMetadata('roles', args);
