import { IUnfilledAtt, TUnfilledAtt } from '@constants/app';
import { ERROR_MSG } from '@constants/error-message';
import { BadRequestException } from '@nestjs/common';
import { baseFindOptions, baseModel, CrUpIs } from 'components/base/base.model';
import { BelongsTo, Column, DataType, ForeignKey, Table } from 'sequelize-typescript';

import { Classes } from './Classes';

export interface IClassesStudentAttr extends IUnfilledAtt {
  id?: number
  classId: number
  studentIds: number[]
}

export interface IClassesStudentCreateAttr extends Omit<IClassesStudentAttr, 'id' | TUnfilledAtt> {
}

@CrUpIs
@Table({
  tableName: 'classes_student',
  indexes: [
    { fields: ['is_deleted', 'class_id'], unique: true }
  ]
})
export class ClassesStudent extends baseModel<IClassesStudentAttr, IClassesStudentCreateAttr>() implements IClassesStudentAttr {


  @ForeignKey(() => Classes)
  classId: number;

  @BelongsTo(() => Classes)
  class: Classes

  @Column(DataType.JSON)
  studentIds: number[];

  @Column({ defaultValue: 0 })
  isDeleted: boolean

  static async findStudentInClass({ classId, studentId }, options: baseFindOptions) {
    const classStudent = await ClassesStudent.find({ ...options, where: { classId } })

    const studentIdsOfClass = classStudent.studentIds
    if (!studentIdsOfClass.some(id => id == studentId))
      throw new BadRequestException(ERROR_MSG.NO_STUDENT_IN_CLASS)

    return classStudent
  }

}
