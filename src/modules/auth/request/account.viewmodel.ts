import { TUnfilledAtt } from '@constants/app';
import { ENUM_UserRole } from '@constants/enum';
import { IUserLoginAttr } from '@models/UserLogin';
import { Expose } from 'class-transformer';

export class AuthViewModel implements Omit<IUserLoginAttr, TUnfilledAtt | 'password'> {
  @Expose() id: number;
  @Expose() username: string;
  @Expose() role: ENUM_UserRole;

}