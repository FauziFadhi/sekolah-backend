import { IUnfilledAtt, TUnfilledAtt } from '@constants/app';
import { ERROR_CODE } from '@constants/error-code';
import { BadRequestException } from '@nestjs/common';
import { baseModel } from 'components/base/base.model';
import { BeforeCreate, BelongsTo, Column, ForeignKey, Table } from 'sequelize-typescript';

import { DmCourse } from './DmCourse';
import { Teacher } from './Teacher';

export interface ITeacherCourseAttr extends IUnfilledAtt {
  id?: number
  teacherId: number
  courseId: number
}

export interface ITeacherCourseCreateAttr extends Omit<ITeacherCourseAttr, 'id' | TUnfilledAtt> {
}

@Table({
  tableName: 'teacher_course',
  indexes: [
    { fields: ['is_deleted', 'course_id'] },
    { fields: ['is_deleted', 'teacher_id'] },
  ]
})

export class TeacherCourse extends baseModel<ITeacherCourseAttr, ITeacherCourseCreateAttr>() implements ITeacherCourseAttr {

  @BelongsTo(() => Teacher)
  teacher: Teacher

  @ForeignKey(() => Teacher)
  teacherId: number

  @BelongsTo(() => DmCourse)
  course: DmCourse

  @ForeignKey(() => DmCourse)
  courseId: number

  @Column({ defaultValue: 0 })
  isDeleted: boolean

  /**
   * hook for checking duplicate email and throw it immediately before create and update to database
   * @param model {TeacherCourse}
   * @param options {CreateOptions}
   */
  @BeforeCreate
  static async checkDuplicate(model: TeacherCourse, options) {
    const existsTeacherCourse = await this.find({
      where: {
        isDeleted: false,
        teacherId: model.teacherId,
        courseId: model.courseId,
      }
    })
    if (existsTeacherCourse) throw new BadRequestException('Teacher course already exists', ERROR_CODE.VALIDATION)

    return model
  }
}