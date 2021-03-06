import { ENUM_ABSENCE_TYPE } from '@constants/enum';
import { IsIn, IsNotEmpty, IsNumber } from 'class-validator';

import { AbsenceCreateDTO } from '../dto/absence.dto';

export class AbsenceRequest implements Omit<AbsenceCreateDTO, 'classId'> {
  @IsNotEmpty()
  @IsIn(Object.values(ENUM_ABSENCE_TYPE))
  type: ENUM_ABSENCE_TYPE;

  @IsNotEmpty()
  @IsNumber()
  studentId: number;

  @IsNotEmpty()
  @IsNumber()
  week: number;

}