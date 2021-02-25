import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Model as SequelizeModel, ModelOptions } from 'sequelize';
import { Model } from 'sequelize-typescript';
import { FindOptions } from 'sequelize/types';
import { ModelHooks } from 'sequelize/types/lib/hooks';

export interface IBaseModel {
  invalidateCache(model: any): Promise<void>
}

export function baseModel<T1, T2>() {
  return class BaseModel extends Model<T1, T2> implements IBaseModel {

    static async find<T extends Model>(this: { new(): T } & typeof BaseModel, options?: FindOptions & { isThrow?: boolean }): Promise<T> {
      const data = await this.findOne(options)

      this.throw(data, options?.isThrow)

      return data as any
    }

    invalidateCache(model: any): Promise<void> {
      throw new InternalServerErrorException(`method invalidateCache not implemented yet at Model`)
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

export function InvalidateHook(arg?: any): void {
  invalidate(arg)
}

const OPTIONS_KEY = 'sequelize:options';

function invalidate(target: typeof SequelizeModel) {
  const hooksOptions: Partial<ModelHooks<any>> = {
    afterFind: (model, options) => {
      model.invalidateCache(model)
    }
  }

  let _options = getOptions(target.prototype);

  Reflect.defineMetadata(OPTIONS_KEY, { ..._options, hooks: hooksOptions }, target.prototype);
}

export function getOptions(target: any): ModelOptions | undefined {
  const options = Reflect.getMetadata(OPTIONS_KEY, target);

  if (options) {
    return { ...options };
  }
}
