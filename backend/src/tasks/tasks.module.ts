import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { TasksController, AllTasksController } from './tasks.controller';
import { Client } from '../clients/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Client])],
  controllers: [TasksController, AllTasksController],
  providers: [TasksService],
})
export class TasksModule {}
