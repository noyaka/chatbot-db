import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Client } from './Client';

@Entity()
export class ChatBotRule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'jsonb', transformer: { from: (value) => JSON.parse(value), to: (value) => JSON.stringify(value) } })
  nextrule: JSON

  @Column({ type: 'text' })
  response: string;

  @Column({ type: 'text' })
  message_validity_check: string;

  @Column({ type: 'text' })
  fail_response: string;

  @OneToMany(() => Client, (client) => client.current_chatbot_rule)
  clients: Client[]
}