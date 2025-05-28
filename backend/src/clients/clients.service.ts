import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { User } from '../users/user.entity';
import * as csv from 'csv-parser';
import { Readable } from 'stream';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async create(data: Partial<Client>, userId: string) {
    const client = this.clientRepository.create({
      ...data,
      user: { id: userId } as User,
    });
    return this.clientRepository.save(client);
  }

  async findAll(userId: string) {
    return this.clientRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, userId: string) {
    const client = await this.clientRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!client) throw new NotFoundException('Client non trouvé');
    if (client.user.id !== userId) throw new ForbiddenException('Accès refusé');

    return client;
  }

  async update(id: string, data: Partial<Client>, userId: string) {
    const client = await this.findOne(id, userId);
    Object.assign(client, data);
    return this.clientRepository.save(client);
  }

  async remove(id: string, userId: string) {
    const client = await this.findOne(id, userId);
    return this.clientRepository.remove(client);
  }

  async importFromCsv(fileBuffer: Buffer, userId: string): Promise<Client[]> {
    const stream = Readable.from(fileBuffer.toString());
    const clients: Partial<Client>[] = [];

    return new Promise((resolve, reject) => {
      stream
        .pipe(csv())
        .on('data', (row) => {
          const client: Partial<Client> = {
            name: row.name,
            company: row.company,
            phone: row.phone,
            email: row.email,
            status: row.status || 'prospect',
            user: { id: userId } as User,
          };
          clients.push(client);
        })
        .on('end', async () => {
          try {
            const savedClients = await this.clientRepository.save(clients);
            resolve(savedClients);
          } catch (error) {
            reject(error);
          }
        })
        .on('error', reject);
    });
  }
}
