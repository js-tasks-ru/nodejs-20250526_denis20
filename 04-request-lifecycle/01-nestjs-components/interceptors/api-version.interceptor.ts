import { NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { map, tap } from "rxjs";

export class ApiVersionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const now = Date.now();

    return next.handle().pipe(
      map((data) => ({
        ...data,
        apiVersion: "1.0",
        executionTime: `${Date.now() - now}ms`,
      })),
    );
  }
}
