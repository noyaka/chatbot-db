import { Client } from "../Entities/Client";
import dataSource from "../config";

export async function createNewClient() {
    try {
      const clientRepository = dataSource.getRepository(Client);
      const client = new Client();
      await clientRepository.save(client);
      return client;
    } catch (error) {
        throw new Error('An error occurred while creating the client');
    }
}

export async function getClients() {
    try {
        const clientRepository = dataSource.getRepository(Client);
        const clients = await clientRepository.find();
        if (clients.length === 0) {
            throw new Error('Client not found');
        }
        return clients
    } catch (error) {
        throw new Error('An error occurred while getting clients');
    }
}

export async function getClient(id: number) {
    try {
        const clientRepository = dataSource.getRepository(Client);
        const client = await clientRepository.findOne({where: {id: id}});
        if (!client) {
            throw new Error('Client not found');
        }
        return client;
    } catch (error) {
        throw new Error('An error occurred while getting the client');
    }
}

export async function delClient(id: number) {
    try {
        const clientRepository = dataSource.getRepository(Client);
        const client = await clientRepository.findOne({where: {id: id}});
        if (!client) {
            throw new Error('Client not found');
        }
        await clientRepository.remove(client);
        return client;
    } catch (error) {
        throw new Error('An error occurred while deleting the client');
    }
}

export async function updateClient(client: Client, current_chatbot_rule: number) {
    try {
        const clientRepository = dataSource.getRepository(Client);
        if (!client) {
            throw new Error('Client not found');
        }
        client.current_chatbot_rule = current_chatbot_rule;
        await clientRepository.save(client);
        return client;
    } catch (error) {
        throw new Error('An error occurred while deleting the client');
    }
}