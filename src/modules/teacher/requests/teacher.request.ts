import { AuthCreateRequest } from '@auth/request/auth.request';
import { GENDER, PTK_TYPE, RELIGION } from '@constants/app';
import { Type } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import { TeacherCreateDTO } from '../dto/student.dto';

export class TeacherCreateRequest implements TeacherCreateDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  nuptk: string;

  @IsNotEmpty()
  @IsEnum(GENDER)
  gender: GENDER;

  @IsNotEmpty()
  @IsString()
  birthPlace: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  birthDate: Date;

  @IsNotEmpty()
  @IsEnum(PTK_TYPE)
  ptkType: PTK_TYPE;

  @IsNotEmpty()
  @IsEnum(RELIGION)
  religion: RELIGION;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AuthCreateRequest)
  account: AuthCreateRequest;

}