import { GENDER, IUnfilledAtt, RELIGION, TUnfilledAtt } from '@constants/app';
import { NotFoundException } from '@nestjs/common';
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { FindOptions } from 'sequelize/types';

export interface IStudentAttr extends IUnfilledAtt {
  id?: number
  name: string
  nipd: string
  gender: GENDER
  nisn: string
  birthPlace: string
  birthDate: Date
  religion: RELIGION
  userLoginId: number
}

export interface IStudentCreateAttr extends Omit<IStudentAttr, 'id' | TUnfilledAtt> {
}

@Table({
  tableName: 'student',
  indexes: [
    { fields: ['is_deleted', 'name'] },
    { fields: ['is_deleted', 'nisn'] }
  ]
})

export class Student extends Model<IStudentAttr, IStudentCreateAttr> implements IStudentAttr {

  @Column
  name: string;

  @Column
  nipd: string;

  @Column(DataType.ENUM({ values: Object.values(GENDER) }))
  gender: GENDER

  @Column
  nisn: string;

  @Column
  birthPlace: string;

  @Column
  birthDate: Date;

  @Column(DataType.ENUM({ values: Object.values(RELIGION) }))
  religion: RELIGION;

  @Column
  userLoginId: number;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @Column
  isDeleted: boolean;

  static async findByUserLogin(userLoginId: number, options?: FindOptions & { isThrow?: boolean }) {
    const data = await Student.findOne({
      ...options,
      where: {
        userLoginId,
        ...options.where,
      }
    })

    if (!data && options.isThrow) throw new NotFoundException()

    return data
  }
}