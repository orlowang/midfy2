import * as React from 'react';
const styl = require('./style.styl');

/**
 * Error
 */
export class Error extends React.Component<any, any>{
  render(){
    return <div className={`${styl.Error} ErrorComp`}>
      Error...
    </div>; 
  }
}

/**
 * Loading
 */
export class Loading extends React.Component<any, any>{
  render(){
    return <div className={`${styl.Loading} LoadingComp`}>
      Loading...
    </div>; 
  }
}