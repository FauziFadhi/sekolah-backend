import { IUnfilledAtt, TUnfilledAtt } from '@constants/app';
import { ENUM_GENDER, ENUM_RELIGION } from '@constants/enum';
import { ERROR_CODE } from '@constants/error-code';
import { BadRequestException } from '@nestjs/common';
import { baseModel } from 'components/base/base.model';
import { BeforeCreate, BeforeUpdate, BelongsToMany, Column, DataType, HasMany, Table } from 'sequelize-typescript';
import { FindOptions } from 'sequelize/types';

import { Classes } from './Classes';
import { ClassesStudent } from './ClassesStudent';
import { Score } from './Score';

export interface IStudentAttr extends IUnfilledAtt {
  id?: number
  name: string
  nipd: string
  gender: ENUM_GENDER
  email: string
  nisn: string
  birthPlace: string
  birthDate: Date
  religion: ENUM_RELIGION
  userLoginId: number
}
export interface IStudentCreateAttr extends Omit<IStudentAttr, 'id' | TUnfilledAtt> {
}

// @InvalidateHook
@Table({
  tableName: 'student',
  indexes: [
    { fields: ['is_deleted', 'name'] },
    { fields: ['is_deleted', 'email'] },
    { fields: ['is_deleted', 'nisn'] },
    { fields: ['is_deleted', 'id'] },
  ],
})
export class Student extends baseModel<IStudentAttr, IStudentCreateAttr>() implements IStudentAttr {

  @Column
  name: string;

  @Column
  nipd: string;

  @Column(DataType.ENUM({ values: Object.values(ENUM_GENDER) }))
  gender: ENUM_GENDER

  @Column
  nisn: string;

  @Column
  email: string;

  @Column
  birthPlace: string;

  @Column
  birthDate: Date;

  @Column(DataType.ENUM({ values: Object.values(ENUM_RELIGION) }))
  religion: ENUM_RELIGION;

  @Column
  userLoginId: number;

  @Column({ defaultValue: 0 })
  isDeleted: boolean

  @HasMany(() => Score)
  scores: Score[]

  @BelongsToMany(() => Classes, () => ClassesStudent)
  classes: Classes[]

  static async findByUserLogin(userLoginId: number, options?: FindOptions & { isThrow?: boolean }) {
    return await Student.find({
      ...options,
      where: {
        userLoginId,
        ...options?.where,
      },
    })
  }
  static async findByUserLoginCache(userLoginId: number, options?: FindOptions & { isThrow?: boolean }) { }

  /**
   * hook for checking duplicate email and throw it immediately before create and update to database
   * @param model {Student}
   * @param options {CreateOptions}
   */
  @BeforeCreate
  @BeforeUpdate
  static async checkDuplicateEmail(model: Student, options) {
    let isExistsEmail: Student = undefined
    if (model.id)
      isExistsEmail = await this.find({
        lock: options?.transaction?.LOCK.SHARE,
        where: {
          isDeleted: false,
          email: model.email,
          id: {
            ne: model.id,
          },
        },
      })
    else
      isExistsEmail = await Student.find({
        lock: options?.transaction?.LOCK.SHARE,
        where: {
          isDeleted: false,
          email: model.email,
        },
      })

    if (isExistsEmail) throw new BadRequestException('email has been used', ERROR_CODE.VALIDATION)

    return model
  }
}
