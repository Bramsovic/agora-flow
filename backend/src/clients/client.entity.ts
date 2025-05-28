import { Note } from '../notes/note.entity';
import { OneToMany } from 'typeorm';
import { Task } from '../tasks/task.entity';

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
  } from 'typeorm';
  import { User } from '../users/user.entity';
  
  export type ClientStatus = 'prospect' | 'client' | 'perdu';
  
  @Entity()
  export class Client {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    name: string;
  
    @Column({ nullable: true })
    company: string;
  
    @Column({ nullable: true })
    phone: string;
  
    @Column({ nullable: true })
    email: string;
  
    @Column({ type: 'enum', enum: ['prospect', 'client', 'perdu'], default: 'prospect' })
    status: ClientStatus;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @OneToMany(() => Task, (task) => task.client)
    tasks: Task[];

    @OneToMany(() => Note, (note) => note.client)
    notes: Note[];


  }
  

  