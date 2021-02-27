import { AuthViewModel } from '@auth/request/account.viewmodel';
import { GENDER, PTK_TYPE, RELIGION, TUnfilledAtt } from '@constants/app';
import { ITeacherAttr } from '@models/Teacher';
import { Exclude, Expose, Type } from 'class-transformer';

export class TeacherViewModel implements Omit<ITeacherAttr, TUnfilledAtt> {
  @Expose() nuptk: string;
  @Expose() ptkType: PTK_TYPE;
  @Expose() id: number;
  @Expose() name: string;
  @Expose() gender: GENDER;
  @Expose() email: string;
  @Expose() birthPlace: string;
  @Expose() birthDate: Date;
  @Expose() religion: RELIGION;
  @Exclude() userLoginId: number;

  @Type(() => AuthViewModel)
  @Expose()
  account: AuthViewModel
}