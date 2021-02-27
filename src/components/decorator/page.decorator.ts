import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { queryPaginationSort } from '@utils/helpers';
import { isUndefined, omitBy } from 'lodash';

export const Page = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query
    const limit = +query.size ?? undefined

    return omitBy({
      offset: (query.size * query.page) - +query.size || undefined,
      limit: limit || undefined,
      orders: queryPaginationSort(query.sort, field => (field)) || [],
    }, isUndefined)
  },
);
