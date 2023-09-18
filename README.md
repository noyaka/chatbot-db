# chatbot-db
I have built a Chatbot that can assist you interact with your customers 🤖🚀

The Chatbot engages in conversation with the customer to gather information and understand his needs, while also saving the collected data for tracking and future usage 📥📤

This Chatbot is a server-side service I developed using Microsoft Azure Bot Service. It communicates with Azure cloud Database for PostgreSQL through a DataSource, which is a TypeScript ORM library that connects the application to a rational database. I created schemas and relationships between the tables using TypeORM with TypeScript decorators.

The Chatbot evaluates customer needs, performs input validation checks, and provides appropriate responses. It utilizes user and conversation state management to track the conversation and enable personalized communication 🤝. The customer's messages are stored in the database.

I created RESTful API endpoints using the Express framework to create routes for each table in the database. Through the API, you can perform CRUD operations (create, read, update, delete) on the data by sending HTTP requests to the server.

So, what can you see in the video? 📹

The database contains 3️⃣ tables: 
1. A table for the rule-based chatbot: 
The table includes the following columns: 
* next rule: a JSON file indicating the next message to be sent to the user based on their input
* The message sent to the customer
* Regular Expression (RegEx) for input validation check
* Error message in case the customer's input is invalid

2. A table for client: 
The ID of the rule-based chatbot the customer is assigned to.

3. A table for messages: 
For each message sent by the customer, the message is stored along with the customer's ID, timestamp of the message, and a boolean variable indicating whether the customer received a response to the message (if the input is valid) or not.

The Chatbot initiates a conversation with the customer and asks questions to gather information. At the end of the conversation, you can see that the conversation is documented in the database ✅
