import * as React from 'react';
import {
  Userarea
} from '../UserareaComp';
import {
  TextInput
} from '../TextComp';
import {
  Link
} from 'react-router';
const styl = require('./style.styl');

export interface SignInProps {
  className?: string;
  usrImgSize: string;
  usrImgBorderSize: string;
};

interface SignInState {
  usrImg?: string;
}
/**
 * SignIn
 */
export class SignIn extends React.Component<SignInProps, SignInState>{
  constructor(props){
    super(props);
    this.state = {
      usrImg: ''
    };
  };
  render(){
    let _classname = this.props.className ? ' ' + this.props.className : '';
    return <div className={`${styl.base}${_classname} signInComp`}>
      <Userarea imgSize={this.props.usrImgSize} borderSize={this.props.usrImgBorderSize}/>
      <div className={styl.inner}>
        <TextInput placeholder="Full Name"></TextInput>
        <TextInput placeholder="Password" ispwd={true}></TextInput>
      </div>
      <Link to={``}></Link>
    </div>; 
  }
}