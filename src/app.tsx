import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  browserHistory,
  hashHistory,
  Router
} from "react-router";
import CreateRoutes from "./route";
import "./assets/css/style.css";

const remoteIP = '10.39.230.12';
const remoteIPhome = '192.168.1.107';

// fix a:active can't be work. 
// window.appEnvironment = {
//   appName: 'zhuzhuer',
//   appVersion: '3.0.10',
//   language: 'en',
//   platform: 'Android'
// };
document.body.addEventListener('touchstart', ()=>{})
ReactDOM.render(
  <Router 
    history={hashHistory} 
    children={CreateRoutes}
  />,
  document.getElementById('ReactContainer')
)
