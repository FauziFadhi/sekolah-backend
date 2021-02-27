import { AuthViewModel } from '@auth/request/account.viewmodel';
import { GENDER, RELIGION, TUnfilledAtt } from '@constants/app';
import { IStudentAttr } from '@models/Student';
import { Exclude, Expose, Type } from 'class-transformer';

export class StudentViewModel implements Omit<IStudentAttr, TUnfilledAtt> {
  @Expose() id: number;
  @Expose() name: string;
  @Expose() nipd: string;
  @Expose() gender: GENDER;
  @Expose() email: string;
  @Expose() nisn: string;
  @Expose() birthPlace: string;
  @Expose() birthDate: Date;
  @Expose() religion: RELIGION;
  @Exclude() userLoginId: number;

  @Type(() => AuthViewModel)
  @Expose()
  account: AuthViewModel
}