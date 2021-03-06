import { IUnfilledAtt, TUnfilledAtt } from '@constants/app';
import { baseModel } from 'components/base/base.model';
import { BelongsTo, Column, ForeignKey, Table } from 'sequelize-typescript';

import { Classes } from './Classes';
import { DmCourse } from './DmCourse';
import { Teacher } from './Teacher';
import { TeacherCourse } from './TeacherCourse';

export interface IClassCourseAttr extends IUnfilledAtt {
  id?: number
  classId: number
  teacherId: number
  courseId: number
  teacherCourseId: number
}

export interface IClassCourseCreateAttr extends Omit<IClassCourseAttr, 'id' | TUnfilledAtt> {
}

@Table({
  tableName: 'class_course',
  indexes: [
    { fields: ['is_deleted', 'class_id', 'teacher_id', 'course_id'], unique: true },
  ]
})

export class ClassCourse extends baseModel<IClassCourseAttr, IClassCourseCreateAttr>() implements IClassCourseAttr {

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

  @BelongsTo(() => TeacherCourse)
  teacherCourse: TeacherCourse

  @ForeignKey(() => TeacherCourse)
  teacherCourseId: number

  @Column({ defaultValue: 0 })
  isDeleted: boolean

}