import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('MAIL_HOST'),
      port: Number(this.configService.get('MAIL_PORT')),
      auth: {
        user: this.configService.get('MAIL_USER'),
        pass: this.configService.get('MAIL_PASS'),
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string, html?: string) {
    const from = this.configService.get('MAIL_FROM') || 'noreply@crm.com';

    const info = await this.transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
    });

    console.log('Email envoyé : %s', info.messageId);
    return info;
  }
}
