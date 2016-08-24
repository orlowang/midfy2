import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList
} from 'graphql'
import {
  nodeDefinitions,
  fromGlobalId
} from 'graphql-relay'

const data = require('./mock.json')

const menuType = new GraphQLObjectType({
  name: 'Menu',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    keyprop: {type: GraphQLString},
    url: {type: GraphQLString},
    child: {type: new GraphQLList(menuType)}
  })
})

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    switch (type) {
      case 'Menu':
        return (_, args) => data.menu;
    }
    return null;
  },
  (obj) => {
    if (obj instanceof menu) {
      return menuType;
    }
    return null;
  }
);

let viewerType = new GraphQLObjectType({
  name: "Viewer",
  description: "Base type for Smashgather queries",
  fields: () => ({
    menu: {
      type: new GraphQLList(menuType),
      resolve: (_) => data.menu
    },
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