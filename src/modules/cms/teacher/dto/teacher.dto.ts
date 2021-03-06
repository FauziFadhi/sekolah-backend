import { ITeacherCreateAttr } from '@models/Teacher';
import { IUserLoginCreateAttr } from '@models/UserLogin';

export interface TeacherCreateDTO extends Omit<ITeacherCreateAttr, 'userLoginId'> {
  account: Omit<IUserLoginCreateAttr, | 'role'>
}