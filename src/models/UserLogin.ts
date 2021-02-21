import { IUnfilledAtt, TUnfilledAtt, UserRole } from '@constants/app';
import { ERROR_CODE } from '@constants/error-code';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { BeforeCreate, BeforeUpdate, Column, DataType, Model, Table } from 'sequelize-typescript';
import { CreateOptions } from 'sequelize/types';

export interface IUserLoginAttr extends IUnfilledAtt {
  id?: number
  username: string
  password: string
  role: UserRole
}

export interface IUserLoginCreateAttr extends Omit<IUserLoginAttr, 'id' | TUnfilledAtt> {
}

@Table({
  tableName: 'user_login',
  indexes: [
    { fields: ['is_deleted', 'username'] },
  ],
})

export class UserLogin extends Model<IUserLoginAttr, IUserLoginCreateAttr> implements IUserLoginAttr {

  @Column
  username: string;

  @Column
  password: string;

  @Column(DataType.ENUM({ values: Object.values(UserRole) }))
  role: UserRole

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
