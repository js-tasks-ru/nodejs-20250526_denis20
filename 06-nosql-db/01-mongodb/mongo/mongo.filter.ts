import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from "@nestjs/common";
import { Response } from "express";
import mongoose from "mongoose";

@Catch(mongoose.Error.ValidationError, mongoose.mongo.MongoError)
export class MongoFilter implements ExceptionFilter {
  catch(
    exception: mongoose.Error.ValidationError | mongoose.mongo.MongoError,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = HttpStatus.BAD_REQUEST;
    let message = exception.message;

    if (exception instanceof mongoose.Error.ValidationError) {
      message = exception.message;
    } else if (exception instanceof mongoose.mongo.MongoError) {
      if (exception.code === 11000) {
        message = this.formatDuplicateKeyError(exception);
      }
    }

    response.status(statusCode).json({
      statusCode,
      error: "Bad Request",
      message,
    });
  }

  private formatDuplicateKeyError(
    exception: mongoose.mongo.MongoError,
  ): string {
    if (exception.message.includes("duplicate key error")) {
      const keyMatch = exception.message.match(/index: (.+?)_/);
      if (keyMatch && keyMatch[1]) {
        return `Duplicate value for field: ${keyMatch[1]}`;
      }
    }
    return exception.message;
  }
}
