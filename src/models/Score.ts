import { IUnfilledAtt, TUnfilledAtt } from '@constants/app';
import { baseModel } from 'components/base/base.model';
import { BelongsTo, Column, DataType, ForeignKey, Table } from 'sequelize-typescript';

import { Classes } from './Classes';
import { DmCourse } from './DmCourse';
import { Student } from './Student';
import { Teacher } from './Teacher';

export interface IScoreAttr extends IUnfilledAtt {
  id?: number
  classId: number
  teacherId: number
  courseId: number
  studentId: number
  score: number
  /** scoreType id */
  type: number
  sequence: number
}

export interface IScoreCreateAttr extends Omit<IScoreAttr, 'id' | TUnfilledAtt> {
}

@Table({
  tableName: 'score',
  indexes: [
    { fields: ['is_deleted', 'class_id', 'student_id'] },
    { fields: ['is_deleted', 'class_id', 'teacher_id'] },
  ]
})

export class Score extends baseModel<IScoreAttr, IScoreCreateAttr>() implements IScoreAttr {

  @Column(DataType.DOUBLE)
  score: number;

  @Column
  type: number;

  @Column
  sequence: number;

  @BelongsTo(() => Student)
  student: Student

  @ForeignKey(() => Student)
  studentId: number

  @BelongsTo(() => Teacher)
  teacher: Teacher

  @ForeignKey(() => Teacher)
  teacherId: number

  @BelongsTo(() => DmCourse)
  course: DmCourse

  @ForeignKey(() => DmCourse)
  courseId: number

  @BelongsTo(() => Classes)
  class: Classes

  @ForeignKey(() => Classes)
  classId: number

  @Column({ defaultValue: 0 })
  isDeleted: boolean

}