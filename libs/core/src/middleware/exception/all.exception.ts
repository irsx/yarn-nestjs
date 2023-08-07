import {
  BadRequestError,
  CustomError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  ValidationError,
} from '@core/core/providers/error-provider';
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, HttpStatus, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import * as _startCase from 'lodash/startCase';
import { QueryFailedError, TypeORMError } from 'typeorm';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const { url, method, body } = ctx.getRequest();
    Logger.error(`❌ Request URL ${method} : ${url}`, ['ReqUrlClient']);
    if (Object.keys(body)?.length > 0) {
      Logger.error(`❌ BODY : ${JSON.stringify(body)}`, ['ReqBodyClient']);
    }

    let httpStatus = exception?.status || HttpStatus.INTERNAL_SERVER_ERROR;

    const { httpAdapter } = this.httpAdapterHost;
    const errorMessage =
      exception?.message ||
      exception ||
      'Oops! Something went wrong. Please contact your administrator.';

    if (exception instanceof CustomError) {
      httpStatus = exception.status_code;
    }

    if (exception?.name?.includes('NotFoundError')) {
      const modelName = _startCase(
        exception?.message?.replace('No ', '').replace(' found', '')
      );
      const errorMessage = `${modelName} doesn't exist.`;

      return httpAdapter.reply(
        ctx.getResponse(),
        new NotFoundError(errorMessage),
        404
      );
    }

    if (exception instanceof CustomError) {
      Logger.error(exception?.message, ['CustomError']);
      return httpAdapter.reply(ctx.getResponse(), exception, httpStatus);
    }

    if (
      typeof exception === 'object' &&
      exception?.response instanceof CustomError
    ) {
      Logger.error(exception.response, ['CustomError']);
      return httpAdapter.reply(
        ctx.getResponse(),
        exception.response,
        httpStatus
      );
    }

    if (exception instanceof QueryFailedError) {
      Logger.error(exception.query, ['ErrorQuery']);
      Logger.error(exception.message, [exception.name]);
      return httpAdapter.reply(
        ctx.getResponse(),
        new InternalServerError(
          'Oops! Something went wrong. Please contact your administrator.'
        ),
        httpStatus
      );
    }

    if (exception instanceof TypeORMError) {
      Logger.error(exception.message, [exception.name]);

      return httpAdapter.reply(
        ctx.getResponse(),
        new InternalServerError(
          'Oops! Something went wrong. Please contact your administrator.'
        ),
        httpStatus
      );
    }

    if (httpStatus === 404) {
      Logger.error(errorMessage);
      return httpAdapter.reply(
        ctx.getResponse(),
        new NotFoundError(errorMessage, {
          status_code: httpStatus,
          success: false,
        }),
        httpStatus
      );
    }

    if (httpStatus === 400) {
      Logger.error(errorMessage);
      return httpAdapter.reply(
        ctx.getResponse(),
        new BadRequestError(errorMessage, {
          status_code: httpStatus,
          success: false,
        }),
        httpStatus
      );
    }

    if (httpStatus === 422) {
      Logger.error(errorMessage);

      return httpAdapter.reply(
        ctx.getResponse(),
        new ValidationError(errorMessage, {
          status_code: httpStatus,
          success: false,
        }),
        httpStatus
      );
    }

    if (httpStatus === 403) {
      Logger.error(errorMessage);

      return httpAdapter.reply(
        ctx.getResponse(),
        new ForbiddenError(errorMessage, {
          status_code: httpStatus,
          success: false,
        }),
        httpStatus
      );
    }

    Logger.error(`❌ message error ${errorMessage}`, 'ErrorCode');

    return httpAdapter.reply(
      ctx.getResponse(),
      new InternalServerError(errorMessage, {
        status_code: httpStatus,
        success: false,
      }),
      httpStatus
    );
  }
}
