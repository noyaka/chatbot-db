import { ActivityHandler, ConversationState, MessageFactory, StatePropertyAccessor, UserState } from 'botbuilder';
import { UserProfile } from './StateType/UserProfile';
import { Client } from './Entities/Client';
import { getChatBotRule, getNextChatBotRule } from './Utils/ChatBotRuleUtils';
import { createNewClient, updateClient } from './Utils/ClientUtils';
import { createNewMessage } from './Utils/MessageUtils';
import { ConversationData } from './StateType/ConversationData';
import { checkRegex } from './Utils/Regex';

const USER_PROFILE_PROPERTY = 'userProfile';
const CONVERSATION_DATA_PROPERTY = 'conversationData';

export class Botdb extends ActivityHandler {
    private userState: UserState;
    private conversationState: ConversationState;
    private userProfileAccessor: StatePropertyAccessor<UserProfile>;
    private conversationDataAccessor: StatePropertyAccessor<ConversationData>;

    constructor(userState: UserState, conversationState: ConversationState) {   
        super();
        // state for save clients states
        this.userState = userState;
        this.conversationState = conversationState;
        this.userProfileAccessor = this.userState.createProperty(USER_PROFILE_PROPERTY);
        this.conversationDataAccessor = this.conversationState.createProperty(CONVERSATION_DATA_PROPERTY);

        this.onMessage(async (context, next) => {
            let userProfile: UserProfile = await this.userProfileAccessor.get(context);
            let conversationData: ConversationData = await this.conversationDataAccessor.get(context);

            if (!userProfile || !userProfile.client) {
                if (conversationData && conversationData.client && conversationData.client.id) {
                    userProfile = { client: conversationData.client };
                } else {
                    const client = await createNewClient();
                    userProfile = { client: client };
                }
                await this.userProfileAccessor.set(context, userProfile); 
            }
            let currclient: Client;
            if (conversationData && conversationData.client) {
                currclient = conversationData.client;
            } else {
                currclient = userProfile.client;
                conversationData = { client: currclient };
                await this.conversationDataAccessor.set(context, conversationData);
            }

            const currChatBotRule = await getChatBotRule(currclient.current_chatbot_rule);
            
            // check if client input is valid
            const isValid = await checkRegex(currChatBotRule.message_validity_check, context.activity.text)
            
            let replyText: string;
            if(isValid){
                let message = await createNewMessage(context.activity.text, new Date(), currclient.id);
                const nextRuleId = await getNextChatBotRule(currChatBotRule, message);
                currclient = await updateClient(currclient, nextRuleId);
                replyText = (await getChatBotRule(nextRuleId)).response;

                // save the updated client
                userProfile = { client: currclient };
                conversationData = { client: currclient };
                await this.userProfileAccessor.set(context, userProfile); 
                await this.conversationDataAccessor.set(context, conversationData);
            } else {
                replyText = currChatBotRule.fail_response;
            }

            await context.sendActivity(MessageFactory.text(replyText, replyText));
            
            // By calling next() you ensure that the next BotHandler is run
            await next();
        })
        // when a user is added to chat
        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (const member of membersAdded) {
                if (member.id !== context.activity.recipient.id) {
                    const welcomeMessage = process.env.WELCOME_MESSAGE;
                    await context.sendActivity(welcomeMessage);
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}
