import { createNewMessage, delMessage, getMessage, getMessages, updateMessage } from '../Utils/MessageUtils';

export async function createMessage(req, res) {
    try {
        const { content, timestamp, client_id } = req.body;
        const message = await createNewMessage(content, timestamp, client_id);
      res.status(201).json({ message: 'Message created successfully', data: message });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the message' });
    }
}

export async function getAllMessages(req, res) {
    try {
        const messages = await getMessages();
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
        const message = await getMessage(id);
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
        const message = await delMessage(id);
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }
        res.status(200).json({ message: 'Message deleted successfully', data: message });
    } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the message' });
    }
}

export async function updateMessageAns(req, res) {
    try {
        const { id } = req.params;
        const message = await updateMessage(id);
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }
        res.status(200).json({ message: 'Message updated successfully', data: message });
    } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the message' });
    }
}