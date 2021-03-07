import { IUnfilledAtt, TUnfilledAtt } from '@constants/app';
import { ERROR_CODE } from '@constants/error-code';
import { ERROR_MSG } from '@constants/error-message';
import { BadRequestException } from '@nestjs/common';
import { baseFindOptions, baseModel, CrUpIs } from 'components/base/base.model';
import { BeforeCreate, BelongsTo, Column, ForeignKey, Table } from 'sequelize-typescript';

import { Classes } from './Classes';
import { Student } from './Student';

export interface IClassesStudentAttr extends IUnfilledAtt {
  id?: number
  classId: number
  studentId: number
}

export interface IClassesStudentCreateAttr extends Omit<IClassesStudentAttr, 'id' | TUnfilledAtt> {
}

@CrUpIs
@Table({
  tableName: 'classes_student',
  indexes: [
    { fields: ['is_deleted', 'class_id', 'student_id'], unique: true }
  ]
})
export class ClassesStudent extends baseModel<IClassesStudentAttr, IClassesStudentCreateAttr>() implements IClassesStudentAttr {


  @ForeignKey(() => Classes)
  classId: number;

  @BelongsTo(() => Classes)
  class: Classes

  @BelongsTo(() => Student)
  student: Student

  @ForeignKey(() => Student)
  studentId: number;

  @Column({ defaultValue: 0 })
  isDeleted: boolean

  static async findStudentInClass({ classId, studentId }, options?: baseFindOptions) {
    const classStudent = await ClassesStudent.find({ ...options, where: { classId, studentId } })

    if (!classStudent)
      throw new BadRequestException(ERROR_MSG.NO_STUDENT_IN_CLASS)

    return classStudent
  }

  @BeforeCreate
  static async checkDuplicateStudent(model: ClassesStudent, options) {
    const classStudent = await ClassesStudent.findStudentInClass({ classId: model.classId, studentId: model.studentId })

    if (classStudent) throw new BadRequestException('student already exists in this class', ERROR_CODE.VALIDATION)

    return model
  }

}
