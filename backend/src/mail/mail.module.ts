import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { ConfigModule } from '@nestjs/config';
import { NotesModule } from '../notes/notes.module'; // 👈 À ajouter

@Module({
  imports: [ConfigModule, NotesModule], // 👈 Ajout ici aussi
  providers: [MailService],
  controllers: [MailController],
  exports: [MailService],
})
export class MailModule {}
