import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { circularToJSON } from './helpers';

type Meta = {
  total: number,
  current_total: number,
  total_page: number,
  current_page: number
  per_page: number
  startOf: number,
}

@Injectable()
export class ResponsePaginationInterceptor<T> implements NestInterceptor<T, any> {
  resource
  serializeName: string

  offset

  /**
   * @property
   * @type {string}
   * all query inserted when access endpoint
   */
  queryString: string = ''

  /**
   * endpoint url
   */
  pathname = null

  /**
   * @property
   * @type {Object}
   * all query inserted when access endpoint
   */
  query = null

  constructor(
    resource,
    serializeName: string,
  ) {
    this.resource = resource
    this.serializeName = serializeName
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    this.query = request.query

    const offset = (this.query.size * this.query.page) - +this.query.size ?? 0
    this.query['offset'] = offset

    return next.handle().pipe(map((resp) => {
      const { count, rows, ...additionalMeta } = circularToJSON(resp)

      this.queryString = request._parsedUrl.query || ''
      this.pathname = request._parsedUrl.pathname

      // make to json serialize
      const resource = new this.resource(this.serializeName, rows)

      const meta = this.meta(count, rows, additionalMeta)

      return { ...resource, meta, links: this.links(meta) }

    }));
  }

  /**
   * link of response
   * @param param0
   */
  private links({ current_page, total_page }: Meta) {
    // LINKS

    const self = () => {
      return this.linkQueries(current_page)
    }
    const prev = () => {
      const prevPage = +current_page - 1
      if (prevPage < 1)
        return undefined

      return this.linkQueries(prevPage)
    }
    const next = () => {
      if (+current_page >= +total_page)
        return undefined

      return this.linkQueries(+current_page + 1)
    }

    const last = () => {
      if (!+total_page)
        return undefined
      return this.linkQueries(total_page)
    }

    return {
      self: self(),
      prev: prev(),
      next: next(),
      last: last(),
    }
  }

  private linkQueries(itsPage: number): string {
    const updatedQuery = this.queryString.replace(`page=${this.query.page}`, `page=${(itsPage)}`)

    return `${this.pathname}?${updatedQuery}`
  }

  /**
   * generate meta of response pagination
   * @param count
   * @param rows
   * @param additionalMeta
   */
  private meta(count, rows: any[], additionalMeta: any) {
    // META
    const total: number = count.length || count

    const totalPage = Math.ceil(total / (+this.query.size || 0))

    return total >= 0 && {
      total,
      current_total: rows?.length || 0,
      total_page: totalPage,
      current_page: +additionalMeta?.meta?.page || +this.query.page || 1,
      per_page: + this.query.size || 0,
      startOf: count && this.query['offset'] + 1 || 0 as Number,
    } || undefined;
  }
}
