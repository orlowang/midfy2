import * as Relay from "react-relay";

export default {
  viewer: () => Relay.QL`
    query {
      viewer
    }`
};

// get viewer by component
// export default {
//   viewer: (component) => Relay.QL`
//     query {
//       viewer {
//         ${component.getFragment('viewer')}
//       }
//     }`
// };