import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Client } from './Client';

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    content: string;

    @CreateDateColumn()
    timestamp: Date;

    @OneToOne(() => Client)
    @JoinColumn()
    client_id: Client;

    @Column({ type: 'boolean', default: false })
    answered: boolean;
}