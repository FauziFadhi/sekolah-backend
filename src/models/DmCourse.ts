import { IUnfilledAtt, TUnfilledAtt } from '@constants/app';
import { ERROR_CODE } from '@constants/error-code';
import { BadRequestException } from '@nestjs/common';
import { baseModel } from 'components/base/base.model';
import { BeforeCreate, BeforeUpdate, BelongsToMany, Column, Table } from 'sequelize-typescript';

import { Teacher } from './Teacher';
import { TeacherCourse } from './TeacherCourse';

export interface ICourseAttr extends IUnfilledAtt {
  id?: number
  name: string
}
export interface ICourseCreateAttr extends Omit<ICourseAttr, 'id' | TUnfilledAtt> {
}

@Table({
  tableName: 'dm_course',
  indexes: [
    { fields: ['is_deleted', 'name'] },
    { fields: ['is_deleted', 'id'] },
  ],
})
export class DmCourse extends baseModel<ICourseAttr, ICourseCreateAttr>() implements ICourseAttr {


  @Column({ allowNull: false })
  name: string

  @Column({ defaultValue: 0 })
  isDeleted: boolean

  @BelongsToMany(() => Teacher, () => TeacherCourse)
  teachers: Teacher

  /**
   * hook for checking duplicate name and throw it immediately before create and update to database
   * @param model {DmCourse}
   * @param options {CreateOptions}
   */
  @BeforeCreate
  @BeforeUpdate
  static async checkDuplicateName(model: DmCourse, options) {
    let isExistsEmail: DmCourse = undefined
    if (model.id)
      isExistsEmail = await this.find({
        lock: options?.transaction?.LOCK.SHARE,
        where: {
          isDeleted: false,
          name: model.name,
          id: {
            ne: model.id,
          },
        },
      })
    else
      isExistsEmail = await DmCourse.find({
        lock: options?.transaction?.LOCK.SHARE,
        where: {
          isDeleted: false,
          name: model.name,
        },
      })

    if (isExistsEmail) throw new BadRequestException('name has been used', ERROR_CODE.VALIDATION)

    return model
  }
}
