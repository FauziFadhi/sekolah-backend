import { REGEX_YEAR } from '@constants/regex';
import { IsArray, IsIn, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Matches } from 'class-validator';

import { ClassesCreateDTO, ClassesUpdateDTO } from '../dto/classes.dto';

export class ClassesCreateRequest implements ClassesCreateDTO {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  studentIds: number[];

  @IsNotEmpty()
  @IsNumber()
  homeTeacherId: number;

  @IsNotEmpty()
  @IsNumber()
  majorId: number;

  @IsNotEmpty()
  @IsIn([11, 12, 10])
  grade: 10 | 11 | 12;

  @IsNotEmpty()
  @IsNumberString()
  @Matches(REGEX_YEAR, { message: 'Tahun yang di masukan tidak valid' })
  schoolYear: number;

}

export class ClassesUpdateRequest implements Omit<ClassesUpdateDTO, 'id'> {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  homeTeacherId: number;

  @IsNotEmpty()
  @IsNumber()
  majorId: number;

  @IsNotEmpty()
  @IsIn([11, 12, 10])
  grade: 10 | 11 | 12;

  @IsNotEmpty()
  @IsNumberString()
  @Matches(REGEX_YEAR, { message: 'Tahun yang di masukan tidak valid' })
  schoolYear: number;
}