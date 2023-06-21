import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Message } from './Message'

@Entity()
export class ChatBotRule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'jsonb', transformer: { from: (value) => JSON.parse(value), to: (value) => JSON.stringify(value) } })
  nextrule: Array<{ key: Message, value: number }>;

  @Column({ type: 'text' })
  response: string;

  @Column({ type: 'text' })
  message_validity_check: string;

  @Column({ type: 'text' })
  fail_response: string;
}