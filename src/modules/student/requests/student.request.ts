import { AuthCreateRequest } from '@auth/request/auth.request';
import { GENDER, RELIGION } from '@constants/app';
import { Type } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsNumberString, ValidateNested } from 'class-validator';

import { StudentCreateDTO } from '../dto/student.dto';

export class StudentCreateRequest implements StudentCreateDTO {

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  nipd: string;

  @IsNotEmpty()
  @IsEnum(GENDER)
  gender: GENDER;

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
  @IsEnum(RELIGION)
  religion: RELIGION;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AuthCreateRequest)
  account: AuthCreateRequest;

}