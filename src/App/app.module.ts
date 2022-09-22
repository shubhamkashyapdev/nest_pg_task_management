import { Module } from '@nestjs/common';
import { TasksModule } from 'src/tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TasksModule, TypeOrmModule.forRoot({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Postgres@pass123",
    database: "task_management",
    autoLoadEntities: true,
    synchronize: true,
  })]
})
export class AppModule { }
