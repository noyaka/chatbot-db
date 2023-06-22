import { ChatBotRule } from "./Entities/ChatBotRule";
import { Client } from "./Entities/Client";
import { Message } from "./Entities/Message";
import { DataSource } from "typeorm";

const path = require('path');
const dotenv = require('dotenv');
const ENV_FILE = path.join(__dirname, '.env');
dotenv.config({ path: ENV_FILE });

const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST|| "localhost",
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME|| "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "Botdb",
    synchronize: true,
    logging: true,
    entities: [ChatBotRule, Message, Client],
    subscribers: [],
    migrations: []
});

dataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

export default dataSource;