import { GENDER, IUnfilledAtt, PTK_TYPE, RELIGION, TUnfilledAtt } from '@constants/app';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

export interface ITeacherAttr extends IUnfilledAtt {
  id?: number
  name: string
  nuptk: string
  gender: GENDER
  birthPlace: string
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

export class Teacher extends Model<ITeacherAttr, ITeacherCreateAttr> implements ITeacherAttr {

  @Column
  name: string;

  @Column
  nipd: string;

  @Column(DataType.ENUM({ values: Object.values(GENDER) }))
  gender: GENDER;

  @Column
  ptkType: PTK_TYPE;

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

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @Column
  isDeleted: boolean;
}