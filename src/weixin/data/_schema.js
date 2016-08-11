import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql'
import {
  nodeDefinitions,
  fromGlobalId
} from 'graphql-relay'

const data = require('./mock.json')

const systemType = new GraphQLObjectType({
  name: 'system',
  fields: {
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    icon: {type: GraphQLString},
    brief: {type: GraphQLString},
  }
})

const funcType = new GraphQLObjectType({
  name: 'function',
  fields: {
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
    icon: {type: GraphQLString},
    
  }
})

export const system = {
  type: new GraphQLList(systemType),
  resolve: (_, args) => data.systems
};

export const functions = {
  type: new GraphQLList(funcType),
  resolve: (_, args) => data.functions
}

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    switch (type) {
      case 'system':
        return (_, args) => data.systems;
      case 'function':
        return (_, args) => data.functions;
    }
    return null;
  },
  (obj) => {
    console.log()
    if (obj instanceof system) {
      return systemType;
    } else if (obj instanceof functions) {
      return functionType;
    }
    return null;
  }
);

let queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    system,
    functions
    // add your own root fields here
    // viewer: {
    //   type: new GraphQLList(),
    //   resolve: [
    //     system,
    //     functions
    //   ]
    // }
  })
})

let mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    // add your own mutations here
  })
})

export default new GraphQLSchema({
  query: queryType,
  // mutation: mutationType
}) 