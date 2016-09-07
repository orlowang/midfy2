import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Relay from "react-relay";
// 注意这种写法
import * as useRelay from "react-router-relay";
import {
  applyRouterMiddleware,
  browserHistory,
  hashHistory,
  Router
} from "react-router";
import CreateRoutes from "./route";
import "./assets/css/style.css";

const remoteIP = '10.39.230.12';
const remoteIPhome = '192.168.1.107';

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer(`http://${remoteIP}:8089/graphql`, {
    credentials: 'include',
    headers: {
      'Authorization': "Bearer HzDkZSSZs1V6FSIdPBe7LnKxgISfMc"
    }
  })
);
console.log(useRelay)
// fix a:active can't be work. 
document.body.addEventListener('touchstart', ()=>{})
ReactDOM.render(
  <Router 
    environment={Relay.Store}
    render={applyRouterMiddleware(useRelay)}
    history={hashHistory} 
    children={CreateRoutes}
  />,
  document.getElementById('ReactContainer')
)
