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

const orderType = new GraphQLObjectType({
  name: 'Order',
  fields: {
    id: {type: GraphQLString},
    createTime: {type: GraphQLString},
    goodsId: {type: GraphQLString},
    goodsKUA: {type: kuaType},
    goodsTotalPrice: {type: GraphQLInt},
    userName: {type: GraphQLString},
    userPhoneNumber: {type: GraphQLInt},
    userAddress: {type: GraphQLString},
  }
})

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    phoneNumber: {type: GraphQLString},
    address: {type: GraphQLBoolean},
  }
})

const bannerType = new GraphQLObjectType({
  name: 'Banner',
  fields: {
    url: {type: GraphQLString},
    title: {type: GraphQLString},
    linkTo: {type: GraphQLString},
    isMarketing: {type: GraphQLBoolean},
  }
})

const goodsType = new GraphQLObjectType({
  name: 'Goods',
  fields: {
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    mainImg: {type: GraphQLString},
    price: {type: GraphQLInt},
    hasSold: {type: GraphQLInt},
    inStock: {type: GraphQLInt}
  }
})

const kuaType = new GraphQLObjectType({
  name: 'Kua',
  fields: {
    name: {type: GraphQLString},
    key: {type: new GraphQLList(GraphQLString)}
  }
})

const goodsDetailType = new GraphQLObjectType({
  name: 'GoodsDetail',
  fields: {
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    price: {type: GraphQLInt},
    hasSold: {type: GraphQLInt},
    kuas: {type: new GraphQLList(kuaType)}
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
    banner: {
      type: new GraphQLList(bannerType),
      resolve: (_, args) => data.banner
    },
    goods: {
      type: new GraphQLList(goodsType),
      resolve: (_, args) => data.goods
    }
  })
})

let queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    goodsDetail: {
      type: goodsDetailType,
      args: {
        id: {type: GraphQLString}
      },
      resolve: (_, args) => {
        for (let i = 0; i < data.goods.length; i++) {
          if (data.goods[i].id == args.id) {
            return data.goods[i]
          }
        }
      }
    },
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