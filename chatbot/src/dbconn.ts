import config from './config';
const { createConnection } = require('typeorm');

async function connect() {
try {
    await createConnection(config);
    console.log('Connected to PostgreSQL DB');
}
catch (error) {
    console.error('Error connecting to PostgreSQL:', error);
}
}

connect();