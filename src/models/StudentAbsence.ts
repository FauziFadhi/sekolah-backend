import { IUnfilledAtt, TUnfilledAtt } from '@constants/app';
import { ENUM_ABSENCE_TYPE } from '@constants/enum';
import { baseModel } from 'components/base/base.model';
import { BelongsTo, Column, DataType, ForeignKey, Table } from 'sequelize-typescript';

import { Classes } from './Classes';
import { Student } from './Student';

export interface IAbsence {
  week: number
  type: ENUM_ABSENCE_TYPE
}

export interface IStudentAbsenceAttr extends IUnfilledAtt {
  id?: number
  classId: number
  studentId: number
  absences: IAbsence[]
}

export interface IStudentAbsenceCreateAttr extends Omit<IStudentAbsenceAttr, 'id' | TUnfilledAtt> {
}

@Table({
  tableName: 'student_absence',
  indexes: [
    { fields: ['is_deleted', 'class_id', 'student_id'] },
    { fields: ['is_deleted', 'student_id'] },
  ]
})

export class StudentAbsence extends baseModel<IStudentAbsenceAttr, IStudentAbsenceCreateAttr>() implements IStudentAbsenceAttr {


  @BelongsTo(() => Classes)
  class: Classes

  @ForeignKey(() => Classes)
  classId: number

  @BelongsTo(() => Student)
  student: Student

  @ForeignKey(() => Student)
  studentId: number

  @Column(DataType.JSONB)
  absences: IAbsence[];

  @Column({ defaultValue: 0 })
  isDeleted: boolean
}