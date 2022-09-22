import { IsUUID } from 'class-validator'
export class UUIDInput {
    @IsUUID()
    id: string;
}