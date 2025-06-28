import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TasksModule } from "./tasks/tasks.module";
import { LoggingMiddleware } from "./middlewares/logging.middleware";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { ApiVersionInterceptor } from "./interceptors/api-version.interceptor";
import { HttpErrorFilter } from "./filters/http-error.filter";

@Module({
  imports: [TasksModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiVersionInterceptor,
    },
    { provide: APP_FILTER, useClass: HttpErrorFilter },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes("*");
  }
}
