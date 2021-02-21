import { NotFoundException } from '@nestjs/common';
import { Model } from 'sequelize-typescript';
import { FindOptions } from 'sequelize/types';

export function baseModel<T1, T2>() {
  return class BaseModel extends Model<T1, T2> {

    static async find<T extends Model>(this: { new(): T } & typeof BaseModel, options?: FindOptions & { isThrow?: boolean }): Promise<T> {
      const data = await this.findOne(options)

      this.throw(data, options?.isThrow)

      return data as any
    }

    static throw(data: any, isThrow: boolean) {
      const isDataExist = data
      const isDataDeleted = data && data.isDeleted
      if ((!isDataExist || isDataDeleted) && isThrow) throw new NotFoundException()
    }

    static async findById<T extends Model>(this: { new(): T } & typeof BaseModel, id: number, options?: FindOptions & { isThrow?: boolean }): Promise<T> {
      return await this.find({
        ...options,
        where: {
          ...options.where,
          id,
        },
      }) as any
    }
  }
}