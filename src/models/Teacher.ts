import { GENDER, IUnfilledAtt, PTK_TYPE, RELIGION, TUnfilledAtt } from '@constants/app';
import { ERROR_CODE } from '@constants/error-code';
import { BadRequestException } from '@nestjs/common';
import { baseModel } from 'components/base/base.model';
import { BeforeCreate, BeforeUpdate, BelongsToMany, Column, DataType, Table } from 'sequelize-typescript';

import { DmCourse } from './DmCourse';
import { TeacherCourse } from './TeacherCourse';

export interface ITeacherAttr extends IUnfilledAtt {
  id?: number
  name: string
  nuptk: string
  gender: GENDER
  birthPlace: string
  email: string
  birthDate: Date
  ptkType: PTK_TYPE
  religion: RELIGION
  userLoginId: number
}

export interface ITeacherCreateAttr extends Omit<ITeacherAttr, 'id' | TUnfilledAtt> {
}

@Table({
  tableName: 'teacher',
  indexes: [
    { fields: ['is_deleted', 'name'] },
  ]
})

export class Teacher extends baseModel<ITeacherAttr, ITeacherCreateAttr>() implements ITeacherAttr {

  @Column
  name: string;

  @Column
  nipd: string;

  @Column(DataType.ENUM({ values: Object.values(GENDER) }))
  gender: GENDER;

  @Column
  ptkType: PTK_TYPE;

  @Column
  email: string;

  @Column
  nuptk: string;

  @Column
  birthPlace: string;

  @Column
  birthDate: Date;

  @Column(DataType.ENUM({ values: Object.values(RELIGION) }))
  religion: RELIGION;

  @Column
  userLoginId: number;

  @Column({ defaultValue: 0 })
  isDeleted: boolean

  @BelongsToMany(() => DmCourse, () => TeacherCourse)
  courses: DmCourse

  /**
   * hook for checking duplicate email and throw it immediately before create and update to database
   * @param model {Teacher}
   * @param options {CreateOptions}
   */
  @BeforeCreate
  @BeforeUpdate
  static async checkDuplicateEmail(model: Teacher, options) {
    let isExistsEmail: Teacher = undefined
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
      isExistsEmail = await Teacher.find({
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