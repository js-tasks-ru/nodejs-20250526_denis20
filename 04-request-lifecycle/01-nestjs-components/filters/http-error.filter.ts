import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { appendFileSync } from "fs";

export class HttpErrorFilter
  extends BaseExceptionFilter
  implements ExceptionFilter
{
  catch(exception: HttpException, host: ArgumentsHost) {
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? exception.message
        : "Internal server error";

    const date = new Date().toISOString();

    appendFileSync("errors.log", `[${date}] ${status} - ${message}`);

    super.catch(exception, host);
  }
}
