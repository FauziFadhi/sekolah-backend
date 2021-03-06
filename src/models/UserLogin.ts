import { IUnfilledAtt, TUnfilledAtt } from '@constants/app';
import { ENUM_UserRole } from '@constants/enum';
import { ERROR_CODE } from '@constants/error-code';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { baseModel, CrUpIs } from 'components/base/base.model';
import { BeforeCreate, BeforeUpdate, Column, DataType, Table } from 'sequelize-typescript';
import { CreateOptions } from 'sequelize/types';

export interface IUserLoginAttr extends IUnfilledAtt {
  id?: number
  username: string
  password: string
  role: ENUM_UserRole
}

export interface IUserLoginCreateAttr extends Omit<IUserLoginAttr, 'id' | TUnfilledAtt> {
}

@CrUpIs
@Table({
  tableName: 'user_login',
  indexes: [
    { fields: ['is_deleted', 'username'] },
  ],
})
export class UserLogin extends baseModel<IUserLoginAttr, IUserLoginCreateAttr>() implements IUserLoginAttr {

  @Column
  username: string;

  @Column
  password: string;

  @Column(DataType.ENUM({ values: Object.values(ENUM_UserRole) }))
  role: ENUM_UserRole

  @Column({ defaultValue: 0 })
  isDeleted: boolean

  /**
   * hook for checking duplicate username and throw it immediately before create and update to database
   * @param model {UserLogin}
   * @param options {CreateOptions}
   */
  @BeforeCreate
  @BeforeUpdate
  static async checkDuplicateUsername(model: UserLogin, options: CreateOptions) {
    let isExistsUsername: UserLogin = undefined
    if (model.id)
      isExistsUsername = await this.findOne({
        attributes: ['id'],
        lock: options?.transaction.LOCK.SHARE,
        where: {
          isDeleted: false,
          username: model.username,
          id: {
            ne: model.id,
          },
        },
      })
    else
      isExistsUsername = await this.findOne({
        attributes: ['id'],
        lock: options?.transaction.LOCK.SHARE,
        where: {
          isDeleted: false,
          username: model.username,
        },
      })

    if (isExistsUsername) throw new BadRequestException('username has been used', ERROR_CODE.VALIDATION)

    return model
  }

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(model: UserLogin) {
    if (!model.changed('password'))
      return model

    model.password = await bcrypt.hash(model.password, 10)

    return model
  }

}
