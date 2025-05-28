import {
    Injectable,
    NotFoundException,
    ForbiddenException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { Note } from './note.entity';
  import { Client } from '../clients/client.entity';
  
  @Injectable()
  export class NotesService {
    constructor(
      @InjectRepository(Note)
      private readonly noteRepository: Repository<Note>,
      @InjectRepository(Client)
      private readonly clientRepository: Repository<Client>,
    ) {}
  
    async addNote(clientId: string, userId: string, data: Partial<Note>) {
      const client = await this.clientRepository.findOne({
        where: { id: clientId },
        relations: ['user'],
      });
  
      if (!client) throw new NotFoundException('Client introuvable');
      if (client.user.id !== userId) throw new ForbiddenException('Accès interdit');
  
      const note = this.noteRepository.create({
        ...data,
        client,
      });
  
      return this.noteRepository.save(note);
    }
  
    async getNotes(clientId: string, userId: string) {
      const client = await this.clientRepository.findOne({
        where: { id: clientId },
        relations: ['user'],
      });
  
      if (!client) throw new NotFoundException('Client introuvable');
      if (client.user.id !== userId) throw new ForbiddenException('Accès interdit');
  
      return this.noteRepository.find({
        where: { client: { id: clientId } },
        order: { createdAt: 'DESC' },
      });
    }
  }
  