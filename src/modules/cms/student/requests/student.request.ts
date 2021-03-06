import { AuthCreateRequest } from '@auth/request/auth.request';
import { ENUM_GENDER, ENUM_RELIGION } from '@constants/enum';
import { Type } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsNumberString, ValidateNested } from 'class-validator';

import { StudentCreateDTO } from '../dto/student.dto';

export class StudentCreateRequest implements StudentCreateDTO {

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  nipd: string;

  @IsNotEmpty()
  @IsEnum(ENUM_GENDER)
  gender: ENUM_GENDER;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumberString()
  nisn: string;

  @IsNotEmpty()
  birthPlace: string;

  @IsNotEmpty()
  birthDate: Date;

  @IsNotEmpty()
  @IsEnum(ENUM_RELIGION)
  religion: ENUM_RELIGION;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AuthCreateRequest)
  account: AuthCreateRequest;

}