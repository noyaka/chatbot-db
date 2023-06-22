import { Message } from '../Entities/Message';
import dataSource from '../config';

export async function createMessage(req, res) {
    try {
      const messageRepository = dataSource.getRepository(Message);
      const message = new Message();
      message.content = req.body.content;
      message.timestamp = req.body.timestamp;
      message.client_id = req.body.client_id;
      message.answered = req.body.answered;
  
      // Save the message to the database
      await messageRepository.save(message);
  
      res.status(201).json({ message: 'Message created successfully', data: message });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the message' });
    }
  }


export async function getAllMessages(req, res) {
    try {
        const messageRepository = dataSource.getRepository(Message);
        const messages = await messageRepository.find();
        if (messages.length === 0) {
            return res.status(404).json({ message: 'Message not found', data: [] });
        }
        res.status(200).json({ message: 'Messages retrieved successfully', data: messages });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while getting messages' });
    }
}

export async function getMessageById(req, res) {
    try {
        const { id } = req.params;
        const messageRepository = dataSource.getRepository(Message);
        const message = await messageRepository.findOne({where: {id: id}});
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }
        res.status(200).json({ message: 'Message retrieved successfully', data: message });
    } catch (error) {
    res.status(500).json({ error: 'An error occurred while getting the message' });
    }
}

export async function delMessageById(req, res) {
    try {
        const { id } = req.params;
        const messageRepository = dataSource.getRepository(Message);
        const message = await messageRepository.findOne({where: {id: id}});
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }
        await messageRepository.remove(message);
        res.status(200).json({ message: 'Message deleted successfully', data: message });
    } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the message' });
    }
}

export async function updateMessageAns(req, res) {
    try {
        const { id } = req.params;
        const { answered } = req.body;
        const messageRepository = dataSource.getRepository(Message);
        const message = await messageRepository.findOne({where: {id: id}});
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }
        message.answered = answered;
        await messageRepository.save(message);
        res.status(200).json({ message: 'Message updated successfully', data: message });
    } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the message' });
    }
}