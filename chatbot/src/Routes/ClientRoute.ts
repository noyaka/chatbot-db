import { createClient, getAllClients, getClientById, delClientById, updateClientRule } from '../Repository/ClientRepository';
import express = require('express');

const router = express.Router();

router.post('/', async (req, res) => {
    await createClient(req, res); 
});
router.get('/', async(req, res) => {
    await getAllClients(req, res);
});
router.get('/:id', async (req, res) => {
    await getClientById(req, res);
});
router.delete('/:id', async (req, res) => {
    await delClientById(req, res);
});
router.put('/:id', async (req, res) => {
    await updateClientRule(res, res);
});

export default router;