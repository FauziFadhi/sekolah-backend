import { queryPaginationSort } from '@utils/helpers';
import { Includeable, Order, WhereOptions } from 'sequelize/types';

export class BaseFilter {
  where?: WhereOptions
  include?: Includeable | Includeable[]
  order?: Order
  offset?: number
  limit?: number
  query: any

  constructor(query: any) {

    this.query = query
    this.offset = (query.size * query.page) - +query.size || undefined
    this.limit = +query.size || undefined

    const orders = queryPaginationSort(query.sort, (field) => field) as any
    this.order = [...orders]
  }
}