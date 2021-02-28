import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Model as SequelizeModel, ModelOptions } from 'sequelize';
import { DataType, Model } from 'sequelize-typescript';
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

    invalidateCache<T extends Model>(model: T): Promise<void> {
      throw new InternalServerErrorException(`method invalidateCache not implemented yet at Model`)
    }

    /**
     * throw data if data is null or data isDeleted is true
     * @param data 
     * @param isThrow 
     */
    static throw(data: any, isThrow: boolean) {
      const isDataExist = data
      const isDataDeleted = data && Boolean(data.isDeleted == true)

      if ((!isDataExist || isDataDeleted) && isThrow) throw new NotFoundException(this.name)
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

export function CrUpIs(arg?: any): void {
  createCrUpIs(arg)
}

function createCrUpIs(target: typeof SequelizeModel): void {
  let attribute = {}

  attribute['isDeleted'] = DataType.BOOLEAN
  Reflect.defineMetadata(ATTRIBUTES_KEY, {
    ...attribute
  }, target);
  attribute = {}

  Reflect.defineMetadata(ATTRIBUTES_KEY, {
    updatedAt: DataType.DATE,
  }, target);

  Reflect.defineMetadata(ATTRIBUTES_KEY, {
    createdAt: DataType.DATE,
  }, target);
}

const OPTIONS_KEY = 'sequelize:options';
const ATTRIBUTES_KEY = 'sequelize:attributes';



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


export function Cache(target: Object, key: string, descriptor: TypedPropertyDescriptor<any>) {
  let originalMethod = descriptor.value
  let result = null

  target[`${key}Cache`] = function (...args: any[]) {
    result = originalMethod.apply(target, args);

    return result
  }

  return descriptor;
}