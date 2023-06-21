import {
    CloudAdapter,
    ConfigurationServiceClientCredentialFactory,
    createBotFrameworkAuthenticationFromConfiguration
} from 'botbuilder';

import { Botdb } from './bot';

const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.port || process.env.PORT || 3978;

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
