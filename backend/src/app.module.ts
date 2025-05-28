import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { NotesModule } from './notes/notes.module';
import { TasksModule } from './tasks/tasks.module'; // 👈 import ajouté
import { MailModule } from './mail/mail.module';
import { MailService } from './mail/mail.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true, // ⚠️ désactive-le en prod
    }),
    UsersModule,
    AuthModule,
    ClientsModule,
    NotesModule,
    TasksModule,
    MailModule, // 👈 ajout du module
  ],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}
