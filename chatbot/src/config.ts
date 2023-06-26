import { ChatBotRule } from "./Entities/ChatBotRule";
import { Client } from "./Entities/Client";
import { Message } from "./Entities/Message";
import { DataSource } from "typeorm";
import path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const dataSource = new DataSource({ 
    type: 'postgres',
    host: process.env.DB_HOST, 
    port: parseInt(process.env.DB_PORT, 10), 
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME, 
    entities: [ChatBotRule, Message, Client], 
    synchronize: true, 
    logging: true
})

dataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

export default dataSource;