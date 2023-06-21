import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { ChatBotRule } from './ChatBotRule';

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => ChatBotRule)
    @JoinColumn()
    current_chatbot_rule: ChatBotRule;
}