import { TUnfilledAtt } from '@constants/app';
import { ENUM_GENDER, ENUM_RELIGION } from '@constants/enum';
import { IStudentAttr } from '@models/Student';
import { Exclude, Expose } from 'class-transformer';

export class StudentViewModel implements Omit<IStudentAttr, TUnfilledAtt> {
  @Expose() id: number;
  @Expose() name: string;
  nipd: string;
  gender: ENUM_GENDER;
  email: string;
  nisn: string;
  birthPlace: string;
  birthDate: Date;
  religion: ENUM_RELIGION;
  @Exclude() userLoginId: number;
}