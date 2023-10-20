import { Client } from "../Entities/Client";
import { Message } from "../Entities/Message";

export interface ConversationData {
    client: Client;
    messages: Message[];
}