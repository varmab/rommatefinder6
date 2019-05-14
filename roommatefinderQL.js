const express = require('express');
const graphqlHTTP = require('express-graphql');
const gql = require('graphql');
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
const cors = require('cors');

const typeDefs=require('./typeDefs')
const resolvers=require('./resolvers')

const port = process.env.PORT || 4000;
const app = express();
const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(
  '/graphql',
  cors(),
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(port);
console.log(`Server listening at localhost:${port}`);