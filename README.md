

# Validation Packages
- ``class-validator``


_Nest.js Fields validation_

1. install - class-transformer & class-validator

2. Decorate your dto keys with appropriate decorator example: @IsNotEmpty() (from "class-validator") (this will ensure the incoming value is not empty)

3. Listen for the pipe on root level. in main.ts add 
   - app.useGlobalPipes(new ValidationPipe()); (from @nestjs/common)
   before app.listen(...);
   
_Enum Input Validation_
Validating the Enums with @IsEnum() - use a seperate DTO to validate the enum property
export class UpdateTaskStatusDTO {
    @IsEnum(TaskStatus)
    status: TaskStatus;
}