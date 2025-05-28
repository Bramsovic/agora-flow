import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { MulterModule } from '@nestjs/platform-express'; // 👈 Ajout important

@Module({
  imports: [
    TypeOrmModule.forFeature([Client]),
    MulterModule.register(), // 👈 Permet la gestion des fichiers
  ],
  providers: [ClientsService],
  controllers: [ClientsController],
})
export class ClientsModule {}
