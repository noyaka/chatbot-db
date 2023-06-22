import { PostgresConnectionOptions  } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ChatBotRule } from "./Entities/ChatBotRule";
import { Client } from "./Entities/Client";
import { Message } from "./Entities/Message";

const config: PostgresConnectionOptions  = {
    type: 'postgres',
    host: process.env.DB_HOST as string || "localhost",
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME as string || "postgres",
    password: process.env.DB_PASSWORD as string || "postgres",
    database: process.env.DB_NAME as string || "Botdb",
    synchronize: true,
    logging: true,
    entities: [ChatBotRule, Message, Client],
};

export default config;
