import path from 'path';
import fs from 'fs';
import { graphql } from 'graphql';
import { introspectionQuery, printSchema } from 'graphql/utilities';
import Midfy from '../config';
console.log("======????")
let schema = require(`${Midfy.ENV_PROJECTPATH}/data/schema`).default;
const jsonFile = `${Midfy.ENV_PROJECTPATH}/data/schema.json`;
const graphQLFile = `${Midfy.ENV_PROJECTPATH}/data/schema.graphql`;

async function updateSchema() {
  try {
    const json = await graphql(schema, introspectionQuery);
    fs.writeFileSync(jsonFile, JSON.stringify(json, null, 2));
    fs.writeFileSync(graphQLFile, printSchema(schema));
    console.log('Schema has been regenerated');
  } catch (err) {
    console.error(err.stack);
  }
}

// Run the function directly, if it's called from the command line
if (!module.parent) updateSchema();

export default updateSchema;