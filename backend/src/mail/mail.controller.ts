// src/mail/mail.controller.ts
import {
    Controller,
    Post,
    Param,
    Body,
    Req,
    UseGuards,
  } from '@nestjs/common';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { MailService } from './mail.service';
  import { NotesService } from '../notes/notes.service';
  import { SendEmailDto } from './dto/send-email.dto';
  
  @UseGuards(JwtAuthGuard)
  @Controller('clients/:clientId/email')
  export class MailController {
    constructor(
      private readonly mailService: MailService,
      private readonly notesService: NotesService,
    ) {}
  
    @Post()
    async sendEmailToClient(
      @Param('clientId') clientId: string,
      @Body() dto: SendEmailDto,
      @Req() req,
    ) {
      await this.mailService.sendEmail(dto.to, dto.subject, dto.message);
  
      await this.notesService.addNote(clientId, req.user.id, {
        type: 'email',
        content: `Email envoyé : ${dto.subject}`,
      });
  
      return { success: true, message: 'Email envoyé et note ajoutée.' };
    }
  }
  