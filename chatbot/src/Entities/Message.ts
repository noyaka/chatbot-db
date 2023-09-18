import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Client } from './Client';

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    content: string;

    @CreateDateColumn()
    timestamp: Date;

    @ManyToOne(() => Client, (client) => client.messages,
    { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'client_id', referencedColumnName: 'id' })
    
    @Column()
    client_id: number
}