import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  browserHistory,
  hashHistory,
  Router
} from "react-router";
import isOldVersion, { appVersion } from './helper/version';
import CreateRoutes from "./route";
import "./assets/css/style.css";
import {
  syncCallNative
} from './helper/Fetch';

const slat = 'KFAdfF9dfkeIKJ';
const spec = '8fsDSU2d8fk93jsHJdmK';

if (isOldVersion && location.href.indexOf(spec) < 0) {
  if (location.href.indexOf(slat) < 0 ) {
    location.href = encodeURI(`https://blackpearl.4009515151.com/login?request_uri=https://blackpearl.4009515151.com/assets/h5/?${slat}`);
  }
}

document.body.addEventListener('touchstart', ()=>{})
ReactDOM.render(
  <Router 
    history={hashHistory} 
    children={CreateRoutes}
  />,
  document.getElementById('ReactContainer')
)
