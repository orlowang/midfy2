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
  name: 'System',
  fields: {
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    icon: {type: GraphQLString},
    brief: {type: GraphQLString},
  }
})

const functionType = new GraphQLObjectType({
  name: 'Function',
  fields: {
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
    icon: {type: GraphQLString},
    
  }
})
const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    switch (type) {
      case 'System':
        return (_, args) => data.systems;
      case 'Function':
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

let viewerType = new GraphQLObjectType({
  name: "Viewer",
  description: "Base type for Smashgather queries",
  fields: () => ({
    system: {
      type: new GraphQLList(systemType),
      resolve: (_, args) => data.systems
    },
    functions: {
      type: new GraphQLList(functionType),
      resolve: (_, args) => data.functions
    }
  })
})

let queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    // add your own root fields here
    viewer: {
      type: viewerType,
      resolve: () => { return {} }
    }
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