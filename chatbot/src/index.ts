import {
    CloudAdapter,
    ConfigurationServiceClientCredentialFactory,
    createBotFrameworkAuthenticationFromConfiguration
} from 'botbuilder';

import { Botdb } from './bot';
import { createChatBotRule, delChatBotRuleById, getAllChatBotRules, getChatBotRuleById } from './Repository/ChatBotRuleRepository';
import { createClient, delClientById, getAllClients, getClientById, updateClientRule } from './Repository/ClientRepository';
import { createMessage, delMessageById, getAllMessages, getMessageById, updateMessageAns } from './Repository/MessageRepository';

const express = require('express');
const app = express();
const port = process.env.port || process.env.PORT || 3978;

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

const botFrameworkAuthentication = createBotFrameworkAuthenticationFromConfiguration(null, credentialsFactory);

const adapter = new CloudAdapter(botFrameworkAuthentication);

adapter.onTurnError = async (context, error) => {
    // This check writes out errors to console log .vs. app insights
    console.error(`\n [onTurnError] unhandled error: ${ error }`);

    // Send a trace activity, which will be displayed in Bot Framework Emulator
    await context.sendTraceActivity(
        'OnTurnError Trace',
        `${ error }`,
        'https://www.botframework.com/schemas/error',
        'TurnError'
    );

    // Send a message to the user
    await context.sendActivity('The bot encountered an error or bug.');
    await context.sendActivity('To continue to run this bot, please fix the bot source code.');
};

// Create the main dialog.
const myBot = new Botdb();

// Listen for incoming requests.
app.post('/api/messages', async (req, res) => {
    // Route received a request to adapter for processing
    await adapter.process(req, res, (context) => myBot.run(context));
});

// HTTP REQUESTS FOR CHATBOTRULES
app.post('/chatbots', (req, res) => {
    createChatBotRule(req, res);
});
app.get('/chatbots', (req, res) => {
    getAllChatBotRules(req, res);
});
app.get('/chatbots/:id', (req, res) => {
    getChatBotRuleById(req, res);
});
app.delete('/chatbots/:id', (req, res) => {
    delChatBotRuleById(req, res);
});

// HTTP REQUESTS FOR CLIENTS
app.post('/clients', (req, res) => {
    createClient(req, res);
});
app.get('/clients', (req, res) => {
    getAllClients(req, res);
});
app.get('/clients/:id', (req, res) => {
    getClientById(req, res);
});
app.delete('/clients/:id', (req, res) => {
    delClientById(req, res);
});
app.put('/clients/:id', (req, res) => {
    updateClientRule(req, res);
});

// HTTP REQUESTS FOR MESSAGES
app.post('/messages', (req, res) => {
    createMessage(req, res);
});
app.get('/messages', (req, res) => {
    getAllMessages(req, res);
});
app.get('/messages/:id', (req, res) => {
    getMessageById(req, res);
});
app.delete('/messages/:id', (req, res) => {
    delMessageById(req, res);
});
app.put('/messages/:id', (req, res) => {
    updateMessageAns(req, res);
});
