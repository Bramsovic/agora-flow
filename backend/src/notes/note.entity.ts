import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Client } from '../clients/client.entity';
import { User } from '../users/user.entity';
import { Expose, Type } from 'class-transformer';

@Entity()
export class Note {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @Column()
  @Expose()
  type: 'call' | 'email' | 'comment' | 'task';

  @Column()
  @Expose()
  content: string;

  @CreateDateColumn()
  @Expose()
  createdAt: Date;

  @ManyToOne(() => Client)
  client: Client;

  @ManyToOne(() => User, { eager: true })
  @Expose()
  @Type(() => User)
  author: User;
}
