import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column, JoinColumn } from 'typeorm';
import { ChatBotRule } from './ChatBotRule';
import { Message } from './Message';

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ChatBotRule, (chatBotRule) => chatBotRule.clients,
    { onDelete: 'CASCADE'})
    @JoinColumn({ name: 'current_chatbot_rule', referencedColumnName: 'id' })

    @Column({ default: 10 })
    current_chatbot_rule: number;

    @OneToMany(() => Message, (message) => message.client_id)
    messages: Message[]
}