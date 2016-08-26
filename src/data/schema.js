import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'
import {
  nodeDefinitions,
  fromGlobalId
} from 'graphql-relay'

const data = require('./mock.json')

const skuType = new GraphQLObjectType({
  name: 'Sku',
  fields: {
    Name: {type: GraphQLString},
    Key: {type: new GraphQLList(GraphQLString)}
  }
})

const tagsType = new GraphQLObjectType({
  name: 'Tags',
  fields: {
    Id: {type: GraphQLString},
    Name: {type: GraphQLString},
  }
})

const orderType = new GraphQLObjectType({
  name: 'Order',
  fields: {
    Id: {type: GraphQLString},
    createTime: {type: GraphQLString},
    goodsId: {type: GraphQLString},
    goodsSKU: {type: skuType},
    goodsTotalPrice: {type: GraphQLInt},
    userName: {type: GraphQLString},
    userPhoneNumber: {type: GraphQLInt},
    userAddress: {type: GraphQLString},
  }
})

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    Id: {type: GraphQLString},
    Name: {type: GraphQLString},
    phoneNumber: {type: GraphQLString},
    Address: {type: GraphQLBoolean},
  }
})

const goodsType = new GraphQLObjectType({
  name: 'Goods',
  fields: {
    Id: {type: GraphQLString},
    Name: {type: GraphQLString},
    subTitle: {type: GraphQLString},
    Photos: {type: new GraphQLList(GraphQLString)},
    mainPhoto: {
      type: GraphQLString,
      args: {
        index: {
          type: GraphQLInt,
          defaultValue: 0
        }
      },
      resolve: (obj, args) => obj.Photos[args.index]
    },
    Price: {type: GraphQLInt},
    hasSold: {type: GraphQLInt},
    inStock: {type: GraphQLInt},
    Tags: {type: new GraphQLList(tagsType)},
    SKU: {type: new GraphQLList(skuType)}
  }
})

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    switch (type) {
      case 'Banner':
        return (_, args) => data.banner;
      case 'Goods':
        return (_, args) => data.goods;
    }
    return null;
  },
  (obj) => {
    if (obj instanceof banner) {
      return bannerType;
    } else if (obj instanceof goods) {
      return goodsType;
    }
    return null;
  }
);

let viewerType = new GraphQLObjectType({
  name: "Viewer",
  description: "Base type for Smashgather queries",
  fields: () => ({
    Goods: {
      type: goodsType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (_, args) => {
        for (let i = 0; i < data.goods.length; i++) {
          if (data.goods[i].Id == args.id) {
            return data.goods[i]
          }
        }
      }
    },
    goodsList: {
      type: new GraphQLList(goodsType),
      resolve: (_, args) => data.goods
    }
  })
})

let queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    user: {
      type: userType,
      resolve: (_) => data.user
    },
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