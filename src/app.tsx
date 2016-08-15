import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Relay from "react-relay";
import Dashboard from "./views/dashboard";
import {
  applyRouterMiddleware,
  browserHistory,
  hashHistory,
  Router
} from "react-router";
import * as useRelay from "react-router-relay";
import CreateRoutes from "./route";
import "./assets/css/style.css";

const remoteIP = '10.39.230.37';
const remoteIPhome = '192.168.1.102';

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer(`http://${remoteIPhome}:8089/graphql`, {
    // headers: {
    //   "content-type": "application/graphql"
    // }
  })
);
console.log(useRelay)
ReactDOM.render(
  <Router 
    environment={Relay.Store}
    render={applyRouterMiddleware(useRelay)}
    history={hashHistory} 
    children={CreateRoutes}
  />,
  document.getElementById('ReactContainer')
)
