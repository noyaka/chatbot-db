import dataSource from './config';
const { createConnection } = require('typeorm');

// dbconn file is for connection to the database and to create and edit tables

async function connect() {
    try {
        await createConnection(dataSource);
        console.log('Connected to PostgreSQL DB');
    }
    catch (error) {
        console.error('Error connecting to PostgreSQL:', error);
    }
}

connect();