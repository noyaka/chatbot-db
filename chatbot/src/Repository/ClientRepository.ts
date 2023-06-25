import { createNewClient, delClient, getClient, getClients, updateClient } from '../Utils/ClientUtils';

export async function createClient(req, res) {
    try {
        const client = await createNewClient();
        res.status(201).json({ message: 'Client created successfully', data: client });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the client' });
    }
}

export async function getAllClients(req, res) {
    try {
        const clients = await getClients();
        if (clients.length === 0) {
            res.status(404).json({ message: 'Client not found', data: [] });
        }
        res.status(200).json({ message: 'Clients retrieved successfully', data: clients });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while getting clients' });
    }
}

export async function getClientById(req, res) {
    try {
        const { id } = req.params;
        const client = await getClient(id);
        if (!client) {
            res.status(404).json({ error: 'Client not found' });
        }
        res.status(200).json({ message: 'Client retrieved successfully', data: client });
    } catch (error) {
    res.status(500).json({ error: 'An error occurred while getting the client' });
    }
}

export async function delClientById(req, res) {
    try {
        const { id } = req.params;
        const client = await delClient(id);
        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }
        res.status(200).json({ message: 'Client deleted successfully', data: client });
    } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the client' });
    }
}

export async function updateClientRule(req, res) {
    try {
        const { id } = req.params;
        const { current_chatbot_rule } = req.body;
        const client = await updateClient(id, current_chatbot_rule);
        if (!client) {
            return res.status(404).json({ error: 'Client deleted successfully' });
        }
        res.status(200).json({ message: 'Client updated successfully', data: client });
    } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the client' });
    }
}