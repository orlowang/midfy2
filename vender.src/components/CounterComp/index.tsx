import * as React from 'react';
const styl = require('./style.styl');

export interface CounterProps {
  className?: string;
  current?: number;
  max?: number;
  complete?: Function;
};

interface CounterStatus {
  value?: number;
  count?: number;
  maxLimit?: boolean;
  minLimit?: boolean;
}

/**
 * Counter
 */
export class Counter extends React.Component<CounterProps, CounterStatus>{
  constructor(props){
    super(props);
    this.state = {
       count: this.props.current || 1
    };
  };

  refs : {
    [key: string]: (Element);
    counter: (HTMLInputElement)
  }

  handlePlus(){
    if (!this.props.max) {
      this.setState({
        count: this.state.count + 1,
        minLimit: false
      }, () => this.props.complete(this.refs.counter.value))
    } else {
      if (this.state.count < this.props.max) {
        this.setState({
          count: this.state.count + 1,
          minLimit: false,
          maxLimit: this.state.count >= this.props.max - 1 && true
        }, () => this.props.complete(this.refs.counter.value))
      }
    }
  }

  handleReduce(){
    if (this.state.count >= 2) {
      this.setState({
        count: this.state.count - 1,
        maxLimit: false,
        minLimit: this.state.count <= 2 && true
      }, () => this.props.complete(this.refs.counter.value))
    }
  }

  handleChange(e){
    if(!this.props.max){
      this.setState({
        count: e.target.value != '' ? parseInt(e.target.value.replace(/[^\d]/g,'')) : e.target.value
      }, () => this.props.complete(this.refs.counter.value))
    } else {
      if(e.target.value >= this.props.max){
        this.setState({
          count: this.props.max,
          maxLimit: true
        }, () => this.props.complete(this.refs.counter.value))
      } else {
        this.setState({
          count: e.target.value != '' ? parseInt(e.target.value.replace(/[^\d]/g,'')) : e.target.value,
          maxLimit: false,
        }, () => this.props.complete(this.refs.counter.value))
      }
    }
  }

  handleLeaveCheck(e){
    if(parseInt(this.refs.counter.value) == 0 || this.refs.counter.value == ''){
      this.setState({
        count: 1,
        minLimit: true
      })
    } else {
      this.setState({
        minLimit: false
      })
    }
  }

  render(){
    let _classname = this.props.className ? ' ' + this.props.className : '';
    let _min_limit_classname = this.state.minLimit ? `${styl.noaction} noaction` : '';
    let _max_limit_classname = this.state.maxLimit ? `${styl.noaction} noaction` : '';
    return <div className={`${styl.counter}${_classname} counter`}>
      <a onClick={this.handleReduce.bind(this)} className={_min_limit_classname}>-</a>
      <input onChange={this.handleChange.bind(this)} onBlur={this.handleLeaveCheck.bind(this)} ref="counter" type="tel" value={this.state.count}/>
      <a onClick={this.handlePlus.bind(this)} className={_max_limit_classname}>+</a>
    </div>; 
  }
}