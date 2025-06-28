import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Task } from "./schemas/task.schema";
import { Model, ObjectId } from "mongoose";

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto) {
    try {
      const task = await this.taskModel.create(createTaskDto);
      return task;
    } catch (error) {
      console.error("Error creating task:", error);
      throw new InternalServerErrorException("Failed to create task");
    }
  }

  findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async findOne(id: ObjectId): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) throw new NotFoundException("Task not found");
    return task;
  }

  async update(id: ObjectId, updateTaskDto: UpdateTaskDto) {
    await this.taskModel.updateOne({ _id: id }, updateTaskDto).exec();
    return this.findOne(id);
  }

  async remove(id: ObjectId) {
    const task = await this.findOne(id);
    await this.taskModel.deleteOne({ _id: id }).exec();
    return task;
  }
}
