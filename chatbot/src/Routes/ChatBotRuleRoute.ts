import { createChatBotRule, getAllChatBotRules, getChatBotRuleById, delChatBotRuleById } from "../Repository/ChatBotRuleRepository";
import express = require('express');

const router = express.Router();

router.post('/', async (req, res) => {
    await createChatBotRule(req, res);
});
router.get('/',  async (req, res) => {
    await getAllChatBotRules(req, res);
});
router.get('/:id', async (req, res) => {
    await getChatBotRuleById(req, res);
});
router.delete('/:id', async (req, res) => {
    await delChatBotRuleById(req, res);
});

export default router;