import { NotFoundException } from '@nestjs/common';
import { Column, Model } from 'sequelize-typescript';
import { FindOptions } from 'sequelize/types';

export type ModelStatic<M> = typeof BaseModel & M;

export class BaseModel<TModelAttributes extends {} = any, TCreationAttributes extends {} = TModelAttributes> extends Model<TModelAttributes, TCreationAttributes> {

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @Column
  isDeleted: boolean;

  constructor() {
    super()
  }

  static async find<T>(this: ModelStatic<T>, options?: FindOptions & { isThrow?: boolean }): Promise<T> {
    const data = await this.findOne()

    BaseModel.throw(data, options?.isThrow)

    return data as any
  }

  private static throw(data: any, isThrow: boolean) {
    const isDataExist = data
    const isDataDeleted = data && data.isDeleted
    if ((!isDataExist || isDataDeleted) && isThrow) throw new NotFoundException()
  }

  static async findById<T extends BaseModel>(this: ModelStatic<T>, id: number, options?: FindOptions & { isThrow?: boolean }): Promise<T> {
    return await BaseModel.find({
      ...options,
      where: {
        ...options.where,
        id,
      },
    }) as any
  }
}
