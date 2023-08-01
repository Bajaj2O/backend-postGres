import express from 'express';
import {env} from 'process'
const port = Number(env.PORT) || 8080;
import { ApolloServer } from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';

const initServer = async () => {
    const app = express();
    const server = new ApolloServer({
        typeDefs: `
            type Query {
                hello: String
            }
        `,
        resolvers: {
            Query: {
                hello: () => 'Hello world!',
            }, 
        },
    });
    await server.start();
    app.use(express.json());
    app.use('/graphql', expressMiddleware(server));
    
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}
initServer();





