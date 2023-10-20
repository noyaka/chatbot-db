import { ActivityHandler, ConversationState, MessageFactory, StatePropertyAccessor, UserState } from 'botbuilder';
import { UserProfile } from './StateType/UserProfile';
import { ConversationData } from './StateType/ConversationData';
import { getChatBotRule, getNextChatBotRule } from './Utils/ChatBotRuleUtils';
import { createNewClient, updateClient } from './Utils/ClientUtils';
import { createNewMessage, saveMessages } from './Utils/MessageUtils';
import { checkRegex } from './Utils/Regex';
import { Message } from './Entities/Message';
import { Client } from './Entities/Client';

const USER_PROFILE_PROPERTY = 'userProfile';
const CONVERSATION_DATA_PROPERTY = 'conversationData';

export class Botdb extends ActivityHandler {
    private userState: UserState;
    private conversationState: ConversationState;
    private userProfileAccessor: StatePropertyAccessor<UserProfile>;
    private conversationDataAccessor: StatePropertyAccessor<ConversationData>;

    constructor(userState: UserState, conversationState: ConversationState) {   
        super();
        this.userState = userState;
        this.conversationState = conversationState;
        this.userProfileAccessor = this.userState.createProperty(USER_PROFILE_PROPERTY);
        this.conversationDataAccessor = this.conversationState.createProperty(CONVERSATION_DATA_PROPERTY);

        this.onMessage(async (context, next) => {
            let currclient: Client;
            let userProfile: UserProfile = await this.userProfileAccessor.get(context);
            let conversationData: ConversationData = await this.conversationDataAccessor.get(context);

            if (!userProfile || !userProfile.client) {
                    currclient = await createNewClient();
                    userProfile = { client: currclient };
                    conversationData = { client: currclient, messages: [] as Message[] };
            } else {
                currclient = userProfile.client;
            }
            
            await this.userProfileAccessor.set(context, userProfile); 
            await this.conversationDataAccessor.set(context, conversationData);

            const currChatBotRule = await getChatBotRule(currclient.current_chatbot_rule);
            const isValid = await checkRegex(currChatBotRule.message_validity_check, context.activity.text)
            
            let nextChatBotRule = currChatBotRule;
            let endOfConversation: Boolean;
            let replyText = currChatBotRule.fail_response;
            if(isValid){
                let message = await createNewMessage(context.activity.text, new Date(), currclient.id);
                const nextRuleId = await getNextChatBotRule(currChatBotRule, message);
                nextChatBotRule = await getChatBotRule(nextRuleId);
                endOfConversation = nextChatBotRule.fail_response == '';
                replyText = nextChatBotRule.response;

                conversationData.messages.push(message);

                currclient = await updateClient(currclient, nextRuleId);
            }

            await context.sendActivity(MessageFactory.text(replyText, replyText));
            
            if (endOfConversation) {
                await saveMessages(conversationData.messages);
                conversationData.messages = [];
            }
            await next();
        })

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (const member of membersAdded) {
                if (member.id !== context.activity.recipient.id) {
                    const welcomeMessage = process.env.WELCOME_MESSAGE;
                    await context.sendActivity(welcomeMessage);
                }
            }
            await next();
        });
    }
}
