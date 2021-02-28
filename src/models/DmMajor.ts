import { IUnfilledAtt, TUnfilledAtt } from '@constants/app';
import { ERROR_CODE } from '@constants/error-code';
import { BadRequestException } from '@nestjs/common';
import { baseModel } from 'components/base/base.model';
import { BeforeCreate, BeforeUpdate, Column, Table } from 'sequelize-typescript';

export interface IMajorAttr extends IUnfilledAtt {
  id?: number
  name: string
}
export interface IMajorCreateAttr extends Omit<IMajorAttr, 'id' | TUnfilledAtt> {
}

@Table({
  tableName: 'dm_major',
  indexes: [
    { fields: ['is_deleted', 'name'] },
    { fields: ['is_deleted', 'id'] },
  ],
})
export class DmMajor extends baseModel<IMajorAttr, IMajorCreateAttr>() implements IMajorAttr {

  @Column({ allowNull: false })
  name: string

  @Column({ defaultValue: 0 })
  isDeleted: boolean

  /**
   * hook for checking duplicate name and throw it immediately before create and update to database
   * @param model {DmMajor}
   * @param options {CreateOptions}
   */
  @BeforeCreate
  @BeforeUpdate
  static async checkDuplicateName(model: DmMajor, options) {
    let isExistsEmail: DmMajor = undefined
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
      isExistsEmail = await DmMajor.find({
        lock: options?.transaction?.LOCK.SHARE,
        where: {
          isDeleted: false,
          name: model.name,
        },
      })

    if (isExistsEmail) throw new BadRequestException('email has been used', ERROR_CODE.VALIDATION)

    return model
  }
}
