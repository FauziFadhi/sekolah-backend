import { AuthCreateRequest } from '@auth/request/auth.request';
import { ENUM_GENDER, ENUM_PTK_TYPE, ENUM_RELIGION } from '@constants/enum';
import { Type } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import { TeacherCreateDTO } from '../dto/teacher.dto';

export class TeacherCreateRequest implements TeacherCreateDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  nuptk: string;

  @IsNotEmpty()
  @IsEnum(ENUM_GENDER)
  gender: ENUM_GENDER;

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
  @IsEnum(ENUM_PTK_TYPE)
  ptkType: ENUM_PTK_TYPE;

  @IsNotEmpty()
  @IsEnum(ENUM_RELIGION)
  religion: ENUM_RELIGION;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AuthCreateRequest)
  account: AuthCreateRequest;

}