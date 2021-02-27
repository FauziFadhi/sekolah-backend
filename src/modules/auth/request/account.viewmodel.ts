import { TUnfilledAtt, UserRole } from '@constants/app';
import { IUserLoginAttr } from '@models/UserLogin';
import { Expose } from 'class-transformer';

export class AuthViewModel implements Omit<IUserLoginAttr, TUnfilledAtt | 'password'> {
  @Expose() id: number;
  @Expose() username: string;
  @Expose() role: UserRole;

}