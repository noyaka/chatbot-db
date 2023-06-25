import { createNewChatBotRule, delChatBotRule, getChatBotRule, getChatBotRules } from '../Utils/ChatBotRuleUtils';

export async function createChatBotRule(req, res) {
    try {
        const { nextrule, response, message_validity_check, fail_response } = req.body;
        const chatBotRule = await createNewChatBotRule(nextrule, response, message_validity_check, fail_response);
        res.status(201).json({ message: 'ChatBotRule created successfully', data: chatBotRule });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the chatBotRule' });
    }
}

export async function getAllChatBotRules(req, res) {
    try {
        const chatBotRules = await getChatBotRules();
        if (chatBotRules.length === 0) {
            return res.status(404).json({ message: 'ChatBotRule not found', data: [] });
        }
        res.status(200).json({ message: 'ChatBotRules retrieved successfully', data: chatBotRules });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while getting chatBotRules' });
    }
}

export async function getChatBotRuleById(req, res) {
    try {
        const { id } = req.params;
        const chatBotRule = await getChatBotRule(id);
        if (!chatBotRule) {
            return res.status(404).json({ error: 'ChatBotRule not found' });
        }
        res.status(200).json({ message: 'ChatBotRule retrieved successfully', data: chatBotRule });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while getting the chatBotRule' });
    }
}

export async function delChatBotRuleById(req, res) {
    try {
        const { id } = req.params;
        const chatBotRule = await delChatBotRule(id);
        if (!chatBotRule) {
            return res.status(404).json({ error: 'ChatBotRule not found' });
        }
        res.status(200).json({ message: 'ChatBotRule deleted successfully', data: chatBotRule });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the chatBotRule' });
    }
}