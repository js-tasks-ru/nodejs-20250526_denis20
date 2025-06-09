import { Body, Controller, Param, Patch, Post } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto, UpdateTaskDto } from "./task.model";
import { NotificationsService } from "../notifications/notifications.service";
import { UsersService } from "../users/users.service";

@Controller("tasks")
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly notificationsService: NotificationsService,
    private readonly userService: UsersService,
  ) {}

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    const user = this.userService.getUserById(createTaskDto.assignedTo);
    this.notificationsService.sendEmail(
      user.email,
      "Новая задача",
      `Вы назначены ответственным за задачу: "${createTaskDto.title}"`,
    );
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch(":id")
  async updateTask(
    @Param("id") id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const task = await this.tasksService.updateTask(id, updateTaskDto);
    const user = this.userService.getUserById(task.assignedTo);
    this.notificationsService.sendSMS(
      user.phone,
      `Статус задачи "${task.title}" обновлён на "${task.status}"`,
    );

    return task;
  }
}
