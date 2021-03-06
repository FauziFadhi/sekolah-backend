import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { BaseFilter } from 'components/base/base.filter';
import { Op, seq } from 'database/config';
import { FindOptions } from 'sequelize/types';

import { ListMajorQuery } from '../requests/major.request';


export const MajorListFilter = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): FindOptions => {

    const request = ctx.switchToHttp().getRequest();

    return new filter(request.query)
  },
);

class filter extends BaseFilter {

  constructor(query: ListMajorQuery) {
    super(query)

    this.whereIsDeleted().orderById()

    if (this.query.search)
      this.search()
  }

  whereIsDeleted() {
    this.where = {
      ...this.where,
      isDeleted: false,
    }
    return this
  }

  orderById() {
    this.order = [...this.order as [], ['id', 'asc']]
    return this
  }

  search() {
    this.where = {
      ...this.where,
      [Op.or]: [
        seq.where(seq.fn('lower', seq.col('DmMajor.name')), { [Op.like]: `%${this.query.search}%` }),
      ]
    }
    return this

  }
}
