import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Task } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task | undefined {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) throw new HttpException("Not Found", HttpStatus.NOT_FOUND);

    return task;
  }

  createTask(task: Task): Task {
    const createdTask = { ...task, id: String(this.tasks.length + 1) };
    this.tasks.push(createdTask);
    return createdTask;
  }

  updateTask(id: string, update: Task): Task {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, ...update } : task,
    );
    return this.getTaskById(id);
  }

  deleteTask(id: string): Task {
    const task = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return task;
  }
}
