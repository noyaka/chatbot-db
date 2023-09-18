import { createMessage, getAllMessages, getMessageById, delMessageById } from '../Repository/MessageRepository';
import express = require('express');

const router = express.Router();

router.post('/', async (req, res) => {
    await createMessage(req, res);
});
router.get('/', async (req, res) => {
    await getAllMessages(req, res);
});
router.get('/:id', async (req, res) => {
    await getMessageById(req, res);
});
router.delete('/:id', async (req, res) => {
    await delMessageById(req, res);
});

export default router;