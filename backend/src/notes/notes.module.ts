import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { Client } from '../clients/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Note, Client])], // <-- bien les deux
  providers: [NotesService],
  controllers: [NotesController],
  exports: [NotesService],
})
export class NotesModule {}
