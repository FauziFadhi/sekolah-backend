import { IUnfilledAtt, TUnfilledAtt } from '@constants/app';
import { baseModel, CrUpIs } from 'components/base/base.model';
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

}
