import dataSource from '../config';
import { ChatBotRule } from './../Entities/ChatBotRule';

export async function createChatBotRule(req, res) {
    try {
      const chatBotRuleRepository = dataSource.getRepository(ChatBotRule);
      const chatBotRule = new ChatBotRule();
      chatBotRule.nextrule = req.body.nextrule;
      chatBotRule.response = req.body.response;
      chatBotRule.message_validity_check = req.body.message_validity_check;
      chatBotRule.fail_response = req.body.fail_response;
      // Save the chatBotRule to the database
      await chatBotRuleRepository.save(chatBotRule);
  
      res.status(201).json({ message: 'ChatBotRule created successfully', data: chatBotRule });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the chatBotRule' });
    }
}

export async function getAllChatBotRules(req, res) {
    try {
        const chatBotRuleRepository = dataSource.getRepository(ChatBotRule);
        const chatBotRules = await chatBotRuleRepository.find();
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
        const chatBotRuleRepository = dataSource.getRepository(ChatBotRule);
        const chatBotRule = await chatBotRuleRepository.findOne({where: {id: id}});
        if (!chatBotRule) {
            return res.status(404).json({ error: 'ChatBotRule not found' });
        }
        res.status(200).json({ message: 'ChatBotRule retrieved successfully', data: chatBotRule });
    } catch (error) {
        console.log(error);
    res.status(500).json({ error: 'An error occurred while getting the chatBotRule' });
    }
}

export async function delChatBotRuleById(req, res) {
    try {
        const { id } = req.params;
        const chatBotRuleRepository = dataSource.getRepository(ChatBotRule);
        const chatBotRule = await chatBotRuleRepository.findOne({where: {id: id}});
        if (!chatBotRule) {
            return res.status(404).json({ error: 'ChatBotRule not found' });
        }
        await chatBotRuleRepository.remove(chatBotRule);
        res.status(200).json({ message: 'ChatBotRule deleted successfully', data: chatBotRule });
    } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the chatBotRule' });
    }
}