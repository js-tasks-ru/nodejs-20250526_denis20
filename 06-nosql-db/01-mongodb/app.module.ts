import { Module } from "@nestjs/common";
import { TasksModule } from "./tasks/tasks.module";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/nestjs-tasks", {
      w: 0,
      connectTimeoutMS: 10000,
    }), // строка подключения к базе
    TasksModule, // модуль для работы с задачами
  ],
})
export class AppModule {}
