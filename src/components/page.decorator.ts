import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { queryPaginationSort } from './utils/helpers';

export const Page = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query
    const limit = +query.size ?? undefined

    return {
      offset: query.offset,
      limit,
      orders: queryPaginationSort(query.sort, field => (field)) || [],
    }
  },
);
