import { TaskStatus } from "./task.status.enum";
import { IsEnum } from 'class-validator'

export class UpdateTaskStatusDTO {
    @IsEnum(TaskStatus)
    status: TaskStatus;
}