import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
  } from 'typeorm';
  import { Client } from '../clients/client.entity';
  
  @Entity()
  export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    title: string;
  
    @Column({ type: 'timestamp' })
    dueDate: Date;
  
    @Column({ default: false })
    isDone: boolean;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @ManyToOne(() => Client, (client) => client.tasks, { onDelete: 'CASCADE' })
    client: Client;
  }
  