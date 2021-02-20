import { IUnfilledAtt, TUnfilledAtt, UserRole } from '@constants/app';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
  ]
})

export class UserLogin extends Model<IUserLoginAttr, IUserLoginCreateAttr> implements IUserLoginAttr {

  @Column
  username: string;

  @Column
  password: string;

  @Column(DataType.ENUM({ values: Object.values(UserRole) }))
  role: UserRole

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @Column
  isDeleted: boolean;


}