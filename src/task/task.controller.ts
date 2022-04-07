import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from "@nestjs/common";
import { CreateTaskDto } from "./dtos/create-task.dto";
import { GetTasksFilterDto } from "./dtos/get-tasks-filter.dto";
import { Task, TaskStatus } from "./task.model";
import { TaskService } from "./task.service";

@Controller("task")
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto) {
    if (Object.keys(filterDto).length) {
      return this.taskService.getTasksWithFilter(filterDto);
    } else {
      return this.taskService.getAllTasks();
    }
  }

  @Get("/:id")
  getTaskById(@Param("id") id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Post()
  addTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.addTask(createTaskDto);
  }

  @Delete("/:id")
  deleteTask(@Param("id") id: string): void {
    this.taskService.deleteTask(id);
  }

  @Patch("/:id/status")
  updateStatus(
    @Param("id") id: string,
    @Body("status") status: TaskStatus
  ): Task {
    return this.taskService.updateStatus(id, status);
  }
}
