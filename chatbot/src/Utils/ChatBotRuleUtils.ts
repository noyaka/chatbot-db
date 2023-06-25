import { ChatBotRule } from './../Entities/ChatBotRule';
import { Client } from '../Entities/Client';
import { Message } from '../Entities/Message';
import dataSource from '../config';

export async function createNewChatBotRule(nextrule: Array<{ key: Message | null, value: number }>, response: string, message_validity_check: string, fail_response: string) {
    try {
        const chatBotRuleRepository = dataSource.getRepository(ChatBotRule);
        const chatBotRule = new ChatBotRule();
        chatBotRule.nextrule = nextrule;
        chatBotRule.response = response;
        chatBotRule.message_validity_check = message_validity_check;
        chatBotRule.fail_response = fail_response;
        await chatBotRuleRepository.save(chatBotRule);
    } catch (error) {
        throw new Error('An error occurred while creating the chatBotRule');
    }
}

export async function getChatBotRules() {
    try {
        const chatBotRuleRepository = dataSource.getRepository(ChatBotRule);
        const chatBotRules = await chatBotRuleRepository.find();
        if (chatBotRules.length === 0) {
            throw new Error('ChatBotRule not found');
        }
        return chatBotRules;
    } catch (error) {
        throw new Error('An error occurred while getting chatBotRules');
    }
}

export async function getChatBotRule(id: number) {
    try {
        const chatBotRuleRepository = dataSource.getRepository(ChatBotRule);
        const chatBotRule = await chatBotRuleRepository.findOne({where: {id: id}});
        if (!chatBotRule) {
            throw new Error('ChatBotRule not found');
        }
        return chatBotRule;
    } catch (error) {
        throw new Error('An error occurred while getting the chatBotRule');
    }
}

export async function delChatBotRule(id: number) {
    try {
        const chatBotRuleRepository = dataSource.getRepository(ChatBotRule);
        const chatBotRule = await chatBotRuleRepository.findOne({where: {id: id}});
        if (!chatBotRule) {
            throw new Error('ChatBotRule not found');
        }
        await chatBotRuleRepository.remove(chatBotRule);
        return chatBotRule;
    } catch (error) {
        throw new Error('An error occurred while deleting the chatBotRule');
    }
}

export async function getNextChatBotRule(client: Client, message: Message) {
    try {
        let currChatBotRuleId = client.current_chatbot_rule;
        const chatBotRule = await getChatBotRule(currChatBotRuleId);
        if(Array(chatBotRule.nextrule).length == 1) {
            const pair = Object.values(chatBotRule.nextrule)[0];
            let num: number;
            if (pair) num = pair.value;

            currChatBotRuleId = num;
            if (!currChatBotRuleId){ currChatBotRuleId=2}
        }
        else {
            const result = (chatBotRule).nextrule.find(item => item.key == message);
            currChatBotRuleId = result.value;
        }
        return currChatBotRuleId;
    } catch (error) {
        throw new Error('An error occurred while getting the chatBotRule');
    }
}