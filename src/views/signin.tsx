import * as React from 'react';
import * as Relay from "react-relay";
import {
  Userarea
} from '../../vender.src/components/UserareaComp';
import {
  SignIn
} from '../../vender.src/components/UsersignComp';
const skeleton = require('../assets/css/sign.styl');

export interface SigninProps {};

class Signin extends React.Component<SigninProps, {}>{

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

export default Relay.createContainer(SignIn, {
  fragments: {
    viewer: () => Relay.QL`
      fragments on Viewer {
        menu {
          id,
          name,
          keyprop,
          url,
          child {
            id,
            name,
            keyprop,
            url,
          }
        }
      }
    `
  }
})
