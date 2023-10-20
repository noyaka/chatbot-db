import {
    CloudAdapter,
    ConfigurationServiceClientCredentialFactory,
    createBotFrameworkAuthenticationFromConfiguration
} from 'botbuilder';
import { Botdb } from './bot';
import { MemoryStorage, UserState, ConversationState } from 'botbuilder';
import express = require('express');
import ChatBotRuleRoute from './Routes/ChatBotRuleRoute';
import ClientRoute from './Routes/ClientRoute';
import MessageRoute from './Routes/MessageRoute';
import path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const credentialsFactory = new ConfigurationServiceClientCredentialFactory({
    MicrosoftAppId: process.env.MicrosoftAppId,
    MicrosoftAppPassword: process.env.MicrosoftAppPassword,
    MicrosoftAppType: process.env.MicrosoftAppType,
    MicrosoftAppTenantId: process.env.MicrosoftAppTenantId
});

const memoryStorage = new MemoryStorage();
const userState = new UserState(memoryStorage);
const conversationState = new ConversationState(memoryStorage);

const botFrameworkAuthentication = createBotFrameworkAuthenticationFromConfiguration(null, credentialsFactory);

const adapter = new CloudAdapter(botFrameworkAuthentication);

adapter.onTurnError = async (context, error) => {
    console.error(`\n [onTurnError] unhandled error: ${ error }`);

    await context.sendTraceActivity(
        'OnTurnError Trace',
        `${ error }`,
        'https://www.botframework.com/schemas/error',
        'TurnError'
    );

    await context.sendActivity('The bot encountered an error or bug.');
    await context.sendActivity('To continue to run this bot, please fix the bot source code.');
};

adapter.use(async (context, next) => {
    await userState.load(context);
    await conversationState.load(context);
    await next();
    await userState.saveChanges(context);
    await conversationState.saveChanges(context);
  });

const myBot = new Botdb(userState, conversationState);

app.post('/api/messages', async (req, res) => {
    await adapter.process(req, res, (context) => myBot.run(context));
});

app.use('/chatbots', ChatBotRuleRoute);
app.use('/clients', ClientRoute);
app.use('/messages', MessageRoute);
