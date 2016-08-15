import * as Relay from "react-relay";

export default {
  viewer: () => Relay.QL`
    query {
      viewer
    }`
};

export const goodsDetailQuery = {
  goodsDetail: () => Relay.QL`
    query {
      goodsDetail(id: $goodsid)
    }
  `
}

export const goodsOrderQuery = {
  goodsDetail: () => Relay.QL`
    query {
      goodsDetail(id: $goodsid)
    }
  `
}

// get viewer by component
// export default {
//   viewer: (component) => Relay.QL`
//     query {
//       viewer {
//         ${component.getFragment('viewer')}
//       }
//     }`
// };