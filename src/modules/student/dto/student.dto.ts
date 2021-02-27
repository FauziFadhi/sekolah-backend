import { IStudentCreateAttr } from '@models/Student';
import { IUserLoginCreateAttr } from '@models/UserLogin';

export interface StudentCreateDTO extends Omit<IStudentCreateAttr, 'userLoginId'> {
  account: Omit<IUserLoginCreateAttr, | 'role'>
}