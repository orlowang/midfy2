import * as React from 'react';
const styl = require('./style.styl');

export interface CounterProps {
  className?: string;
  current?: number;
};

/**
 * Counter
 */
export class Counter extends React.Component<CounterProps, {}>{
  refs : {
    [key: string]: (Element);
    counter: (HTMLInputElement)
  }

  handleReduce(){

  }

  handlePlus(){

  }

  render(){
    let _classname = this.props.className ? ' ' + this.props.className : '';
    return <div className={`${styl.counter}${_classname} counter`}>
      <span onClick={this.handleReduce.bind(this)}>-</span>
      <input ref="counter" type="text" value={this.props.current || 0}/>
      <span onClick={this.handlePlus.bind(this)}>+</span>
    </div>; 
  }
}