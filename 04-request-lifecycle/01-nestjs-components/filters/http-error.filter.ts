import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Response } from "express";
import { appendFileSync } from "fs";

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.message;

    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${status} - ${message}\n`;
    const errorResponse = {
      statusCode: status,
      message: message,
      timestamp: timestamp,
    };

    // Log the error
    appendFileSync("errors.log", logMessage);

    // Send the formatted error response
    response.status(status).json(errorResponse);
  }
}
