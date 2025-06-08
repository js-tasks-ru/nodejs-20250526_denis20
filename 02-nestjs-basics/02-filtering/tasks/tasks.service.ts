import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "First task",
      status: TaskStatus.PENDING,
    },
    {
      id: "2",
      title: "Task 2",
      description: "Second task",
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: "3",
      title: "Task 3",
      description: "Third task",
      status: TaskStatus.COMPLETED,
    },
    {
      id: "4",
      title: "Task 4",
      description: "Fourth task",
      status: TaskStatus.PENDING,
    },
    {
      id: "5",
      title: "Task 5",
      description: "Fifth task",
      status: TaskStatus.IN_PROGRESS,
    },
  ];

  private readonly isPositive = (num?: number) => Number(num) > 0;

  getFilteredTasks(
    status?: TaskStatus,
    page?: number,
    limit?: number,
  ): Task[] | undefined {
    let filteredTasks = this.tasks;

    if (status && !Object.values(TaskStatus).includes(status))
      throw new HttpException("Некорректный статус", HttpStatus.BAD_REQUEST);

    if ((page && !this.isPositive(page)) || (limit && !this.isPositive(limit)))
      throw new HttpException(
        "Некорректные параметры пагинации",
        HttpStatus.BAD_REQUEST,
      );

    if (status) {
      filteredTasks = filteredTasks.filter((task) => task.status === status);
    }

    if (page && limit) {
      const amount = page * limit;

      filteredTasks = filteredTasks.slice(amount - limit, limit);
    }

    return filteredTasks;
  }
}
