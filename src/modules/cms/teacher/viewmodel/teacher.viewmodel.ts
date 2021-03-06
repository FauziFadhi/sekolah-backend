import { AuthViewModel } from '@auth/request/account.viewmodel';
import { TUnfilledAtt } from '@constants/app';
import { ENUM_GENDER, ENUM_PTK_TYPE, ENUM_RELIGION } from '@constants/enum';
import { ITeacherAttr } from '@models/Teacher';
import { Exclude, Expose, Type } from 'class-transformer';
import { CourseViewModel } from 'modules/cms/_dm/viewmodel/course.viewmodel';

export class TeacherViewModel implements Omit<ITeacherAttr, TUnfilledAtt> {
  @Expose() nuptk: string;
  @Expose() ptkType: ENUM_PTK_TYPE;
  @Expose() id: number;
  @Expose() name: string;
  @Expose() gender: ENUM_GENDER;
  @Expose() email: string;
  @Expose() birthPlace: string;
  @Expose() birthDate: Date;
  @Expose() religion: ENUM_RELIGION;
  @Exclude() userLoginId: number;

  @Type(() => AuthViewModel)
  @Expose()
  account?: AuthViewModel
}

export class TeacherWithCourseViewModel extends TeacherViewModel {

  @Type(() => CourseViewModel)
  @Expose()
  course: CourseViewModel | CourseViewModel[]
}