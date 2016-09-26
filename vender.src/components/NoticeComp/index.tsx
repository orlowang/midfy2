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

/**
 * Layer
 */
interface LayerProps {
  html?: string;
  confirm?: Object;
  cancel?: Object;
}
export class Layer extends React.Component<any, any>{
  setAction(){
    if (this.props.confirm) {
      return <div onClick={this.props.confirm['func']}>
        <span>{this.props.confirm['text']}</span>
      </div>
    }
    if (this.props.cancel) {
      return <div onClick={this.props.cancel['func']}>
        <span>{this.props.cancel['text']}</span>
      </div>
    }
  }

  render(){
    console.log(this.props.confirm)
    return <div className={`${styl.Layer} LayerComp`}>
      <div className={`${styl.inner} inner`}>
        {this.props.children}
        <div className={styl.action}>
          {this.props.confirm && <div className={`${styl.confirm} confirm`} onClick={this.props.confirm['func']}>
            <span>{this.props.confirm['text']}</span>
          </div>}
        </div>
      </div>
    </div>; 
  }
}