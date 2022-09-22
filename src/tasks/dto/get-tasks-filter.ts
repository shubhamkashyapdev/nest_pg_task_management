import { TaskStatus } from "./task.status.enum";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class GetTasksFilterDTO {
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;
    @IsOptional()
    @IsString()
    search?: string;
}