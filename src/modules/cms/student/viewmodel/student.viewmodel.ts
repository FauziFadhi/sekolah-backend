import { AuthViewModel } from '@auth/request/account.viewmodel';
import { TUnfilledAtt } from '@constants/app';
import { ENUM_GENDER, ENUM_RELIGION } from '@constants/enum';
import { IStudentAttr } from '@models/Student';
import { Exclude, Expose, Type } from 'class-transformer';

export class StudentViewModel implements Omit<IStudentAttr, TUnfilledAtt> {
  @Expose() id: number;
  @Expose() name: string;
  @Expose() nipd: string;
  @Expose() gender: ENUM_GENDER;
  @Expose() email: string;
  @Expose() nisn: string;
  @Expose() birthPlace: string;
  @Expose() birthDate: Date;
  @Expose() religion: ENUM_RELIGION;
  @Exclude() userLoginId: number;

  @Type(() => AuthViewModel)
  @Expose()
  account: AuthViewModel
}