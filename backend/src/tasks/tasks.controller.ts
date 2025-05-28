import {
    Controller,
    Post,
    Get,
    Body,
    Param,
    Patch,
    Req,
    UseGuards,
  } from '@nestjs/common';
  import { TasksService } from './tasks.service';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  
  @UseGuards(JwtAuthGuard)
  @Controller('clients/:clientId/tasks')
  export class TasksController {
    constructor(private readonly tasksService: TasksService) {}
  
    @Post()
    addTask(
      @Param('clientId') clientId: string,
      @Body() body: { title: string; dueDate: Date },
      @Req() req,
    ) {
      return this.tasksService.addTask(clientId, req.user.id, body);
    }
  
    @Get()
    getTasks(@Param('clientId') clientId: string, @Req() req) {
      return this.tasksService.getTasksForClient(clientId, req.user.id);
    }
  }
  
  @UseGuards(JwtAuthGuard)
  @Controller('tasks')
  export class AllTasksController {
    constructor(private readonly tasksService: TasksService) {}
  
    @Get('today')
    getTodayTasks(@Req() req) {
      return this.tasksService.getTasksForToday(req.user.id);
    }
  
    @Patch(':id/done')
    markDone(
      @Param('id') id: string,
      @Body() body: { isDone: boolean },
      @Req() req,
    ) {
      return this.tasksService.markTaskAsDone(id, req.user.id, body.isDone);
    }
  }
  