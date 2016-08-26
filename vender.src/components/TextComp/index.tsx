import * as React from 'react';
import { Link } from 'react-router';
const styl = require('./style.styl');

export interface TitleProps {
  className?: string;
};
/**
 * Title
 */
export class Title extends React.Component<TitleProps, {}>{
  render(){
    let _classname = this.props.className ? ' ' + this.props.className : '';
    return <div className={`${styl.titleComp}${_classname} titleComp`}>
      <span>{this.props.children}</span>
    </div>; 
  }
}

export interface ButtonProps {
  className?: string;
  cilck?: Function;
  to?: string;
};
/**
 * Button
 */
export class Button extends React.Component<ButtonProps, {}>{
  render(){
    let _classname = this.props.className ? ' ' + this.props.className : '';
    return <div onClick={!this.props.to && this.props.cilck ? this.props.cilck : () => {}} className={`${styl.buttonComp}${_classname} buttonComp`}>
      {this.props.to ? <Link to={this.props.to}>{this.props.children}</Link> : this.props.children}
    </div>; 
  }
}

export interface TextProps {
  className?: string;
  lineClamp?: number;
};
/**
 * Text
 */
export class Text extends React.Component<TextProps, {}>{
  render(){
    let _classname = this.props.className ? ' ' + this.props.className : '';
    return <p className={`${styl.base} ${styl.textComp}${_classname} textComp`} 
      style={{
        WebkitLineClamp: this.props.lineClamp || 2
      }}
    >
      {this.props.children}
    </p>; 
  }
}

export interface TextInputProps {
  className?: string;
  type?: string;
  placeholder?: string;
  filter?: string;
  verification?: string;
  default?: string;
};

interface TextInputState {
  notice?: string;
  isinput?: boolean;
  value?: string;
}
/**
 * TextInput
 */
export class TextInput extends React.Component<TextInputProps, TextInputState>{
  constructor(props){
    super(props);
    this.state = {
      isinput: !!this.props.default,
      value: this.props.default,
      notice: ''
    };
  };

  refs : {
    [key: string]: (Element);
    text: (HTMLInputElement)
  }

  componentDidMount(){
    this.activeInput
  }

  textFilter(){

  }

  textVerify(){
    const input = this.refs.text;
    this.setInputState(input.value != '')
  }

  activeInput(){
    this.setInputState(true)
  }

  setInputState(state){
    this.setState({
      isinput: state
    })
  }

  handleChange(e){
    this.setState({
      value: e.target.value
    })
  }

  render(){
    let _classname = this.props.className ? ' ' + this.props.className : '';
    let _input_status = this.state.isinput ? ` ${styl.active} active` : '';
    return <div className={`${styl.textInput}${_classname}${_input_status} textInputComp`}>
      <input ref="text" type={this.props.type || 'text'} 
        onFocus={this.activeInput.bind(this)}
        onInput={this.props.filter && this.textFilter.bind(this)}
        onBlur={this.textVerify.bind(this)} 
        onChange={this.handleChange.bind(this)}
        value={this.state.value}
      />
      {this.props.placeholder && <span className={`${styl.placeholder} placeholder`} data-placeholder={this.props.placeholder}></span>}
    </div>; 
  }
}