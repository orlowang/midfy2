import * as React from 'react';
const styl = require('./style.styl');

export interface SwitchProps {
  className?: string;
  textrt?: boolean;
  size: string;
};

interface SwitchState {
  notice?: string;
  isinput?: boolean;
}
/**
 * Switch
 */
export class Switch extends React.Component<SwitchProps, SwitchState>{
  constructor(props){
    super(props);
    this.state = {
      isinput: false,
      notice: ''
    };
  };
  

  componentDidMount(){
    this.activeInput
  }

  textFilter(){

  }

  textVerify(){
  }

  activeInput(){
    this.setInputState(true)
  }

  setInputState(state){
    this.setState({
      isinput: state
    })
  }

  render(){
    let _classname = this.props.className ? ' ' + this.props.className : '';
    let _input_status = this.state.isinput ? ` ${styl.active} active` : '';
    console.log(_input_status)
    return <label className={`${styl.switch}${_classname} switchComp`}>
      {!this.props.textrt && <span>{this.props.children}</span>}
      <input type="checkbox"/>
      <span className={styl.shape} style={{borderRadius: this.props.size}}><i style={{height: this.props.size, width: this.props.size}}></i></span>
      {this.props.textrt && <span>{this.props.children}</span>}
    </label>; 
  }
}