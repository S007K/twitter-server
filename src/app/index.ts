import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

export async function initServer() {
    
    const app = express();

    const typeDefs = `

  type Query {
    books: String,
    say: String
  }`;

  const resolvers = {
    Query: {
      books: () => 'bingo',
      say: () => 'hello'
    },
  };
    
    const graphqlServer = new ApolloServer({
        typeDefs,
  resolvers,
});
// Note you must call `start()` on the `ApolloServer`
// instance before passing the instance to `expressMiddleware`
await graphqlServer.start();

// Specify the path where we'd like to mount our server
//highlight-start
app.use('/graphql', express.json(), expressMiddleware(graphqlServer));
//highlight-end

return app
}