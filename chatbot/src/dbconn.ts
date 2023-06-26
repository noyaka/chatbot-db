import dataSource from './config';
const { createConnection } = require('typeorm');
import path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

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