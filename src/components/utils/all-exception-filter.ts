import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

import { isJsonString } from './helpers';

// tslint:disable-next-line:variable-name
const JSONAPISerializer = require('json-api-serializer');
// tslint:disable-next-line:variable-name
const Serializer = new JSONAPISerializer();

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException | any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const request = ctx.getRequest();
    const user = request.user;
    const url = request.url;

    const status = (exception instanceof HttpException) ? +exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const stack = !exception.stack ? null : exception.stack;
    const errorCode = (exception as any)?.response?.error || undefined
    const errorMessage: any = (exception as any)?.response?.message || (exception as any)?.response || exception?.message || exception

    console.log(stack);

    let errorDefault: any = {
      status,
      code: errorCode,
      message: isJsonString(errorMessage) ? JSON.parse(errorMessage) : errorMessage,
    }

    console.log(errorDefault);
    if (Array.isArray(errorMessage)) {
      const error = []
      for (const message of errorMessage) {
        error.push({
          ...errorDefault,
          message,
        })
      }
      errorDefault = error
    }

    // Log.create({
    //   type: LOG_TYPE_ERR,
    //   code: errorCode || '00',
    //   title: 'ERROR',
    //   clinicId: user?.clinic?.id || 0,
    //   detail: errorMessage,
    //   request: request.body,
    //   user,
    //   url,
    //   reference: stack,
    //   statusCode: status,
    //   date: dateNow().toDate().toString(),
    // })

    response.status(status).json(Serializer.serializeError(errorDefault))
  }
}
