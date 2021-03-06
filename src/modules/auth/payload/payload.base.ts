import { ENUM_UserRole } from '@constants/enum';
import { ERROR_CODE } from '@constants/error-code';
import { UserLogin } from '@models/UserLogin';
import { UnauthorizedException } from '@nestjs/common';

type className = 'Student' | 'Teacher' | 'Bendahara'

export * from './student.payload'

export function construct(role: ENUM_UserRole, loginData: UserLogin) {
  let className: className = null
  console.log(role);
  switch (role) {
    case ENUM_UserRole.SISWA:
      className = 'Student'
      break;
    // case UserRole.GURU:
    // className = 'Teacher'
    // break;
    // case UserRole.BENDAHARA:
    // className = 'Bendahara'
    // break;

    default: throw new UnauthorizedException('Unauthorized', ERROR_CODE.ROLE_NOT_IMPLEMENTED)
      break;
  }
  const usedClass = `${className}Payload`
  console.log(this);
  return new this[usedClass](loginData)
}

export interface IPayload {
  id: number
  username: string
  role: string
  userId: number
  user: {
    id: number
    name: string
  }
}