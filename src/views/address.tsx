import * as React from 'react';
import {
  Userarea
} from '../../vender.src/components/UserareaComp';
import {
  SignIn
} from '../../vender.src/components/UsersignComp';
const skeleton = require('../assets/css/sign.styl');

export interface SigninProps {};

export default class Signin extends React.Component<SigninProps, {}>{

  componentDidMount(){

  }

  render(){
    return <div className={`${skeleton.Signin} Signin`}>
      <SignIn className={skeleton.inner} 
        usrImgSize={skeleton.usrImgSize} 
        usrImgBorderSize={skeleton.usrImgBorderSize}
      ></SignIn>
    </div>;
  }
}
