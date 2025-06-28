import { Injectable, NotFoundException, Response } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./entities/task.entity";
import { Repository } from "typeorm";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  create(createTaskDto: CreateTaskDto) {
    return this.taskRepository.save(createTaskDto);
  }

  async findAll() {
    return this.taskRepository.find();
  }

  async findOne(id: number) {
    const result = await this.taskRepository.findOneBy({ id });
    if (result?.id === undefined) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return result;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const result = await this.taskRepository.update(id, updateTaskDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return this.findOne(id);
  }

  async remove(id: number): Promise<string> {
    const result = await this.taskRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return "Task deleted successfully";
  }
}
