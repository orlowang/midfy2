import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'
import {
  nodeDefinitions,
  fromGlobalId,
  mutationWithClientMutationId
} from 'graphql-relay'
import fetch from 'node-fetch'
import reqwest from 'reqwest'

let APIORIGIN = 0, API;
const API_URL_PRODUCTION = `http://blackpearl.4009515151.com/interfaces/`; // 1
const API_URL_TEST = `http://test.blackpearl.4009515151.com/interfaces/`;  // 2
const API_URL_DEVELOPMENT = `http://dev.local:3000/`;                      // 0

switch (APIORIGIN) {
  case 0:
    API = API_URL_DEVELOPMENT;
    break;
  case 1:
    API = API_URL_PRODUCTION;
    break;
  case 2:
    API = API_URL_TEST;
    break;
  case 3:
    API = API_URL_TEST_SIMPLE;
    break;
}

function checkStatus(res) {
    console.log(res.headers);
    return res
}

function fetchByUrl(params) {
  return fetch(`http://test.blackpearl.4009515151.com/interfaces/${params}`, {
    credentials: 'include'
  }).then(checkStatus)
    .then(res => res.json())
}



const SimpleKVType = new GraphQLObjectType({
  name: 'SimpleKV',
  fields: {
    Key: {type: GraphQLString},
    Value: {type: GraphQLString},
  }
})

const skuType = new GraphQLObjectType({
  name: 'Sku',
  fields: () => ({
    Name: {type: GraphQLString},
    Key: {type: new GraphQLList(SimpleKVType)}
  })
})

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: {
    productId: {type: GraphQLString},
    Price: {type: GraphQLInt},
    Stock: {type: GraphQLInt},
    Property: {type: new GraphQLList(GraphQLInt)}
  }
})

const simpleUserInfoType = new GraphQLObjectType({
  name: 'SimpleUserInfo',
  fields: {
    name: {type: GraphQLString},
    sex: {type: GraphQLString},
    nickname: {type: GraphQLString},
    mobile: {type: GraphQLString},
    province: {type: GraphQLString},
    city: {type: GraphQLString},
    district: {type: GraphQLString},
    road: {type: GraphQLString},
    project_name: {type: GraphQLString},
    building_name: {type: GraphQLString},
    address: {type: GraphQLString},
  }
})

const goodsListType = new GraphQLObjectType({
  name: 'GoodsList',
  fields: {
    Id: {
      type: GraphQLString,
      resolve: (obj) => obj.goods_id
    },
    Name: {
      type: GraphQLString,
      resolve: (obj) => obj.name
    },
    subTitle: {
      type: GraphQLString,
      resolve: (obj) => obj.title
    },
    mainPhoto: {
      type: GraphQLString,
      resolve: (obj) => obj.img
    },
    Price: {
      type: GraphQLString,
      resolve: (obj) => obj.min_price
    },
    Tags: {
      type: new GraphQLList(SimpleKVType),
      resolve: (obj) => [
        {
          Value: obj.sunshine_community,
          Key: 'sunshine_community'
        }
      ]
    }
  }
})

const goodsType = new GraphQLObjectType({
  name: 'Goods',
  fields: {
    Id: {
      type: GraphQLString,
      resolve: (obj) => obj.goods_id
    },
    Name: {
      type: GraphQLString,
      resolve: (obj) => obj.name
    },
    subTitle: {
      type: GraphQLString,
      resolve: (obj) => obj.title
    },
    Photos: {
      type: new GraphQLList(GraphQLString),
      resolve: (obj) => obj.head_imgs
    },
    mainPhoto: {
      type: GraphQLString,
      resolve: (obj) => obj.head_imgs[0]
    },
    minPrice: {
      type: GraphQLString,
      resolve: (obj) => obj.min_price
    },
    maxPrice: {
      type: GraphQLString,
      resolve: (obj) => obj.max_price
    },
    inStock: {type: GraphQLInt},
    Tags: {
      type: new GraphQLList(SimpleKVType),
      resolve: (obj) => [
        {
          Value: obj.sunshine_community,
          Key: 'sunshine_community'
        }
      ]
    },
    SKU: {
      type: new GraphQLList(skuType),
      resolve: (obj) => obj.extend_product && obj.specs.map((specs) => {
        return {
          Name: specs.name,
          Key: specs.entrys.map((entry) => {
            return {
              Key: entry.value,
              Value: entry.entry_id
            }
          })
        }
      })
    },
    Products: {
      type: new GraphQLList(ProductType),
      resolve: (obj) => obj.products.map((product) => {
        return {
          productId: product.product_id,
          Price: product.price,
          Stock: product.stock,
          Property: product.property
        }
      })
    },
    Detail: {
      type: GraphQLString,
      resolve: (obj) => obj.text_detail
    },
    imgDetail: {
      type: new GraphQLList(SimpleKVType),
      resolve: (obj) => obj.img_detail.map((detail) => {
        return {
          Key: detail.text,
          Value: detail.img
        }
      })
    },
    Shiping: {
      type: GraphQLInt,
      resolve: (obj) => obj.shiping
    }
  }
})

const goodsMutationType = new GraphQLInputObjectType({
  name: 'GoodsMutation',
  fields: {
    goods_id: {type: GraphQLString},
    product_id: {type: GraphQLString},
    num: {type: GraphQLInt},
    price: {type: GraphQLInt}
  }
})

const orderType = new GraphQLInputObjectType({
  name: 'Order',
  fields: {
    goods: { type: new GraphQLList(goodsMutationType) },
    goods_num: { type: GraphQLString },
    shiping: { type: GraphQLInt },
    order_price: { type: GraphQLInt },
    consignee: { type: GraphQLString },
    mobile: { type: GraphQLString },
    address: { type: GraphQLString },
    pay_type: { type: GraphQLString }
  }
})

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    return data[type][id];
  },
  (obj) => {
    if (obj instanceof GoodsList) {
      return goodsListType;
    } else if (obj instanceof Goods) {
      return goodsType;
    } else if (obj instanceof SimpleUserInfo) {
      return simpleUserInfoType;
    }
    return null;
  }
);

const updateOrderMutation = mutationWithClientMutationId({
  name: 'UpdateOrder',
  inputFields: {
    detail: {type: orderType}
  },
  outputFields: {
    orderId: {
      type: GraphQLString,
      resolve: (payload) => payload.result.order_id
    },
    price: {
      type: GraphQLInt,
      resolve: (payload) => payload.result.price
    }
  },
  mutateAndGetPayload: () => 
    fetch(`${API}order/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include"
    })
      .then(res => res.json())
      .then(json => {console.log(json); return json})
})

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
      resolve: (_, args) => 
        fetch(`${API}goods/detail`, {
          credentials: 'include'
        })
          .then(res => res.json())
          .then(json => json.result)
    },
    goodsList: {
      type: new GraphQLList(goodsListType),
      resolve: (_) => {
        console.log(fetchByUrl('http://test.blackpearl.4009515151.com/interfaces/goods/list'))
        return fetchByUrl('http://test.blackpearl.4009515151.com/interfaces/goods/list')
        // fetch(`${API}goods/list`, {
        //     credentials: "include"
        //   })
        //     .then(res => res.json())
        //     .then(json => json.result)
      }
    },
    userInfo: {
      type: simpleUserInfoType,
      resolve: (_) => 
        fetch(`${API}addr/detail`, {
          credentials: "include"
        })
          .then(res => res.json())
          .then(json => json.result)
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
    order: updateOrderMutation
  })
})

export default new GraphQLSchema({
  query: queryType,
  mutation: mutationType
}) 