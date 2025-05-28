import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual } from 'typeorm';
import { Task } from './task.entity';
import { Client } from '../clients/client.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async addTask(clientId: string, userId: string, body: { title: string; dueDate: Date }) {
    const client = await this.clientRepository.findOne({
      where: { id: clientId, user: { id: userId } },
    });

    if (!client) {
      throw new NotFoundException('Client introuvable');
    }

    const task = this.taskRepository.create({
      ...body,
      client,
    });

    return this.taskRepository.save(task);
  }

  async getTasksForClient(clientId: string, userId: string) {
    const client = await this.clientRepository.findOne({
      where: { id: clientId, user: { id: userId } },
    });

    if (!client) {
      throw new NotFoundException('Client introuvable');
    }

    return this.taskRepository.find({
      where: { client: { id: clientId } },
      order: { dueDate: 'ASC' },
    });
  }

  async getTasksForToday(userId: string) {
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    return this.taskRepository.find({
      where: {
        dueDate: LessThanOrEqual(today),
        isDone: false,
        client: { user: { id: userId } },
      },
      relations: ['client'],
      order: { dueDate: 'ASC' },
    });
  }
  async updateDoneStatus(id: string, isDone: boolean, userId: string) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['client', 'client.user'],
    });
  
    if (!task || task.client.user.id !== userId) {
      throw new NotFoundException('Tâche non trouvée ou non autorisée');
    }
  
    task.isDone = isDone;
    return this.taskRepository.save(task);
  }  
  async markTaskAsDone(taskId: string, userId: string, isDone: boolean) {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
      relations: ['client', 'client.user'],
    });
  
    if (!task || task.client.user.id !== userId) {
      throw new NotFoundException('Tâche introuvable ou accès interdit');
    }
  
    task.isDone = isDone;
    return this.taskRepository.save(task);
  }
  


}

