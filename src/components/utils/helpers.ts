import { ERROR_CODE } from '@constants/error-code';
import { UnprocessableEntityException } from '@nestjs/common';
import { DB } from 'database/config';
import { isUndefined, omitBy, snakeCase } from 'lodash';
import * as moment from 'moment';

/**
 * CHECK IF GIVEN STR IS JSON STRING OR NOT
 * @param str 
 */
export const isJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

/**
 * generate date from moment
 * @param {date: date | String, format: string} 
 */
export const dateNow = ({ date, format }: { date?: string | Date, format?: string }) => {
  let dt: undefined | moment.Moment = undefined

  if (date)
    dt = moment(date)
  else
    dt = moment()

  if (format)
    dt.format(format)

  return dt
}

/**
 * formatting query params are given to make query in sequelize
 * @param querySort query sort string form query params
 * @param callback callback for query sort string
 * @param acceptedString accepted string for query params
 */
export const queryPaginationSort = (querySort: string, callback?: (field: string) => string, acceptedString?: string[]) => {
  const stringOrders = querySort?.split(',').filter(Boolean) || []

  const orders = stringOrders.map((order) => {
    const orderFlow = order[0] == '-' ? 'desc' : 'asc'
    const orderBy = order[0] == '-' ? order.slice(1) : order

    if (acceptedString && !acceptedString.includes(orderBy))
      throw new UnprocessableEntityException(`query sort '${order}' not accepted`, ERROR_CODE.VALIDATION)

    const fieldCallback = callback(orderBy)

    if (typeof fieldCallback == 'string' && fieldCallback?.includes('.')) {
      const db: any = DB
      const [table, attribute] = fieldCallback.split('.')
      return [db.literal(`${table}.${snakeCase(attribute)}`), orderFlow]
    }

    return [fieldCallback, orderFlow]
  })
  return orders
}

export const circularToJSON = circular => JSON.parse(JSON.stringify(circular))

export const omitUndefined = (obj: Object) => omitBy(obj, isUndefined)