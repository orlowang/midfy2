import express from 'express'
import graphqlHTTP from 'express-graphql'
import env from './config';
import cors from 'cors'

const graphQLServ = express()

graphQLServ.use('/graphql', cors(), graphqlHTTP({
  schema: require('../src/data/schema').default,
  graphiql: true,
  pretty: true
}))

graphQLServ.listen(env.SIMPLE_GRAPHQL_SRV.port, () => console.log(
  `server is start on http://localhost:${env.SIMPLE_GRAPHQL_SRV.port}/graphql`
))