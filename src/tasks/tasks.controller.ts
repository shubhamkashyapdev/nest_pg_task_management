import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create.task.input';
import { GetTasksFilterDTO } from './dto/get-tasks-filter';
import { UpdateTaskStatusDTO } from './dto/update-task-status';
import { UUIDInput } from './dto/uuid.input';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) { }

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDTO): Promise<Task[]> {
        return this.taskService.getTasks(filterDto)
    }

    @Post()
    create(@Body() createTaskDto: CreateTaskDTO): Promise<Task> {
        return this.taskService.createTask(createTaskDto);
    }

    @Put('/:id')
    updateTaskById(@Param('id') id: string, @Body() updateStatusDto: UpdateTaskStatusDTO): Promise<Task> {
        return this.taskService.updateTaskById(id, updateStatusDto);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): Promise<void> {

        return this.taskService.deleteTaskById(id);
    }
}
