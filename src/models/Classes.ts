import { IUnfilledAtt, TUnfilledAtt } from '@constants/app';
import { ERROR_CODE } from '@constants/error-code';
import { BadRequestException } from '@nestjs/common';
import { baseModel, CrUpIs } from 'components/base/base.model';
import { BeforeCreate, BelongsTo, Column, ForeignKey, Table } from 'sequelize-typescript';

import { DmMajor } from './DmMajor';
import { Teacher } from './Teacher';

export interface IClassesAttr extends IUnfilledAtt {
  id?: number
  name: string
  homeTeacherId: number
  majorId: number
  grade: 10 | 11 | 12
  schoolYear: number
}

export interface IClassesCreateAttr extends Omit<IClassesAttr, 'id' | TUnfilledAtt> {
}

@CrUpIs
@Table({
  tableName: 'classes',
  indexes: [
    { fields: ['is_deleted', 'home_teacher_id', 'school_year'], unique: true },
    { fields: ['is_deleted', 'grade', 'major_id', 'school_year', 'name'], unique: true },
    { fields: ['is_deleted', 'major_id'] },
  ],
})
export class Classes extends baseModel<IClassesAttr, IClassesCreateAttr>() implements IClassesAttr {


  @ForeignKey(() => Teacher)
  homeTeacherId: number;

  @BelongsTo(() => Teacher)
  homeTeacher: Teacher;

  @ForeignKey(() => DmMajor)
  majorId: number;

  @BelongsTo(() => DmMajor)
  major: DmMajor

  @Column({ allowNull: false })
  name: string;

  @Column({ values: ['11', '10', '12'], allowNull: false })
  grade: 10 | 11 | 12;

  @Column({ allowNull: false })
  schoolYear: number;

  @Column({ defaultValue: 0 })
  isDeleted: boolean

  @BeforeCreate
  static async duplicateCass(model: Classes, options) {
    const existsClass = await Classes.find({
      where: {
        isDeleted: false,
        grade: model.grade,
        majorId: model.majorId,
        schoolYear: model.schoolYear
      }
    })

    if (existsClass) throw new BadRequestException('class already exists', ERROR_CODE.VALIDATION)

    return model
  }

  @BeforeCreate
  static async duplicateHomeTeacher(model: Classes, options) {
    const existsClass = await Classes.find({
      where: {
        isDeleted: false,
        homeTeacherId: model.homeTeacherId,
        schoolYear: model.schoolYear
      }
    })

    if (existsClass) throw new BadRequestException('This teacher already become home teacher', ERROR_CODE.VALIDATION)

    return model
  }

}
