import * as React from 'react';
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
    return <div className={`${styl.base}${_classname} titleComp`}>
      <p>{this.props.children}</p>
    </div>; 
  }
}

export interface TextInputProps {
  className?: string;
  ispwd?: boolean;
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
      <input ref="text" type={this.props.ispwd ? 'password' : 'text'} 
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