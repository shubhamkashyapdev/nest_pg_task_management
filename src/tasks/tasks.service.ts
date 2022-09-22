import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDTO } from './dto/create.task.input';
import { GetTasksFilterDTO } from './dto/get-tasks-filter';
import { TaskStatus } from './dto/task.status.enum';
import { UpdateTaskStatusDTO } from './dto/update-task-status';
import { UUIDInput } from './dto/uuid.input';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(Task)
    private taskRepository: Repository<Task>) { }

    async getTasks(filterDto: GetTasksFilterDTO): Promise<Task[]> {
        const { search, status } = filterDto;
        const query = this.taskRepository.createQueryBuilder('task');

        if (status) {
            query.andWhere('task.status = :status', { status: 'OPEN' })
        }
        if (search) {
            query.andWhere('LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)', { search: `%${search}%` })
        }
        const tasks = await query.getMany();
        return tasks;
    }
    async createTask(createTaskDto: CreateTaskDTO): Promise<Task> {
        const { title, description } = createTaskDto;
        return await this.taskRepository.save({ title, description, status: TaskStatus.OPEN })
    }

    async updateTaskById(id: string, updateStatusDto: UpdateTaskStatusDTO): Promise<Task> {
        const task = await this.taskRepository.findOne({ where: { id: id } });
        if (!task) {
            throw new NotFoundException(`Task with id ${id} not found!`)
        }

        task.status = updateStatusDto.status;
        return this.taskRepository.save(task);

    }

    async deleteTaskById(id: string): Promise<void> {
        // @todo - make sure id is a valid UUID (class-validator @IsUUID decorator)
        const result = await this.taskRepository.delete(id);
        console.log({ result })
    }

}
