import {
    Controller,
    Post,
    Get,
    Param,
    Body,
    UseGuards,
    Req,
  } from '@nestjs/common';
  import { NotesService } from './notes.service';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { plainToInstance } from 'class-transformer';
  import { Note } from './note.entity';
  
  @UseGuards(JwtAuthGuard)
  @Controller('clients/:clientId/notes')
  export class NotesController {
    constructor(private readonly notesService: NotesService) {}
  
    @Post()
    async create(
      @Param('clientId') clientId: string,
      @Body() body: { type: 'call' | 'email' | 'comment' | 'task'; content: string },
      @Req() req,
    ) {
      const note = await this.notesService.addNote(clientId, req.user.id, body);
      return plainToInstance(Note, note, { excludeExtraneousValues: true });
    }
  
    @Get()
    async findAll(@Param('clientId') clientId: string, @Req() req) {
      const notes = await this.notesService.getNotes(clientId, req.user.id);
      return notes.map((note) =>
        plainToInstance(Note, note, { excludeExtraneousValues: true }),
      );
    }
  }
  