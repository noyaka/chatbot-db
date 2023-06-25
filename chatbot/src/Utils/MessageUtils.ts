import { Message } from "../Entities/Message";
import dataSource from "../config";

export async function createNewMessage(content: string, timestamp: Date, client_id: number) {
    try {
        const messageRepository = dataSource.getRepository(Message);
        const message = new Message();
        message.content = content;
        message.timestamp = timestamp;
        message.client_id = client_id;
  
        await messageRepository.save(message);
        return message;
    } catch (error) {
        throw new Error('An error occurred while creating the message' );
    }
}

export async function getMessages() {
    try {
        const messageRepository = dataSource.getRepository(Message);
        const messages = await messageRepository.find();
        if (messages.length === 0) {
            throw new Error('Message not found');
        }
        return messages
    } catch (error) {
        throw new Error('An error occurred while getting messages');
    }
}

export async function getMessage(id: number) {
    try {
        const messageRepository = dataSource.getRepository(Message);
        const message = await messageRepository.findOne({where: {id: id}});
        if (!message) {
            throw new Error('Message not found');
        }
        return message;
    } catch (error) {
        throw new Error('An error occurred while getting the message');
    }
}

export async function delMessage(id: number) {
    try {
        const messageRepository = dataSource.getRepository(Message);
        const message = await messageRepository.findOne({where: {id: id}});
        if (!message) {
            throw new Error('Message not found');
        }
        await messageRepository.remove(message);
        return message;
    } catch (error) {
        throw new Error('An error occurred while deleting the message');
    }
}

export async function updateMessage(id: number, answered: boolean) {
    try {
        const messageRepository = dataSource.getRepository(Message);
        const message = await messageRepository.findOne({where: {id: id}});
        if (!message) {
            throw new Error('Message not found');
        }
        message.answered = answered;
        await messageRepository.save(message);
        return message;
    } catch (error) {
        throw new Error('An error occurred while updating the message');
    }
}