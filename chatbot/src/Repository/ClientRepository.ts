import { Client } from '../Entities/Client';
import dataSource from '../config';

export async function createClient(req, res) {
    try {
      const clientRepository = dataSource.getRepository(Client);
      const client = new Client();
      // Save the client to the database
      await clientRepository.save(client);
      res.status(201).json({ message: 'Client created successfully', data: client });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the client' });
    }
}

export async function getAllClients(req, res) {
    try {
        const clientRepository = dataSource.getRepository(Client);
        const clients = await clientRepository.find();
        if (clients.length === 0) {
            return res.status(404).json({ message: 'Client not found', data: [] });
        }
        res.status(200).json({ message: 'Clients retrieved successfully', data: clients });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while getting clients' });
    }
}

export async function getClientById(req, res) {
    try {
        const { id } = req.params;
        const clientRepository = dataSource.getRepository(Client);
        const client = await clientRepository.findOne({where: {id: id}});
        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }
        res.status(200).json({ message: 'Client retrieved successfully', data: client });
    } catch (error) {
    res.status(500).json({ error: 'An error occurred while getting the client' });
    }
}

export async function delClientById(req, res) {
    try {
        const { id } = req.params;
        const clientRepository = dataSource.getRepository(Client);
        const client = await clientRepository.findOne({where: {id: id}});
        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }
        await clientRepository.remove(client);
        res.status(200).json({ message: 'Client deleted successfully', data: client });
    } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the client' });
    }
}

export async function updateClientRule(req, res) {
    try {
        const { id } = req.params;
        const { current_chatbot_rule } = req.body;
        const clientRepository = dataSource.getRepository(Client);
        const client = await clientRepository.findOne({where: {id: id}});
        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }
        client.current_chatbot_rule = current_chatbot_rule;
        await clientRepository.save(client);
        res.status(200).json({ message: 'Client updated successfully', data: client });
    } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the client' });
    }
}