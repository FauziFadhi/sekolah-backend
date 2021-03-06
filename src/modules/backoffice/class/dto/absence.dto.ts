import { ENUM_ABSENCE_TYPE } from '@constants/enum';
import { IStudentAbsenceCreateAttr } from '@models/StudentAbsence';

export interface AbsenceCreateDTO extends Omit<IStudentAbsenceCreateAttr, 'absences'> {
  week: number
  type: ENUM_ABSENCE_TYPE
}