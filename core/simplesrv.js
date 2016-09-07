import express from 'express'
import graphqlHTTP from 'express-graphql'
import morgan from 'morgan'
import env from './config'
import cors from 'cors'

const graphQLServ = express()

let whitelist = [
  'http://dev.local:8089', 
  'http://dev.local:8088', 
  'http://dev.local:3000', 
  'http://t2.int.owl1024.com', 
  'http://4009515151.com',
  'http://stage.4009515151.com',
  'http://test.4009515151.com', 
  'http://pay.4009515151.com', 
  'http://blackpearl.4009515151.com',
  'http://test.blackpearl.4009515151.com'
];
let corsOptionsDelegate = function(req, callback){
  let corsOptions;
  if(whitelist.indexOf(req.header('Origin')) !== -1){
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  }else{
    corsOptions = { origin: false }; // disable CORS for this request
  }
  // credentials 设置为true，当使用fetch时只设置Access-Control-Allow-Origin无法通过安全校验
  corsOptions.credentials = true;
  console.log(corsOptions)
  callback(null, corsOptions);
};

graphQLServ.use(morgan(`combined`))
graphQLServ.use('/graphql', cors(corsOptionsDelegate), graphqlHTTP({
  schema: require('../src/data/schema').default,
  graphiql: true,
  pretty: true,
  formatError: error => ({
    message: error.message,
    locations: error.locations,
    stack: error.stack
  })
}))

graphQLServ.listen(env.SIMPLE_GRAPHQL_SRV.port, () => console.log(
  `server is start on http://localhost:${env.SIMPLE_GRAPHQL_SRV.port}/graphql`
))