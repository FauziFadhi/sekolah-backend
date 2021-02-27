import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FindOptions, Includeable, WhereOptions } from 'sequelize/types';

export const StudentListFilter = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): FindOptions => {

    const request = ctx.switchToHttp().getRequest();
    console.log(request);

    console.log(request.query);
    return new filter(request.query)
  },
);

class filter implements FindOptions {
  where?: WhereOptions
  include?: Includeable | Includeable[]

  constructor(query) {
    this.where = {
      ...this.where,
      id: 1,
    }
  }
}
