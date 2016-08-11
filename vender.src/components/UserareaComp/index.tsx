import * as React from 'react';
import {
  TextInput
} from '../TextComp';
import {
  Link
} from 'react-router';
const styl = require('./style.styl');

export interface UserareaProps {
  className?: string;
  imgSize: string;
  borderSize: string;
};

/**
 * UserareaComp
 */
export class Userarea extends React.Component<UserareaProps, {}>{
  render(){
    let _classname = this.props.className ? ' ' + this.props.className : '';
    return <div className={`${styl.usrarea}${_classname} userareaComp`} 
      style={{
        height: `${parseInt(this.props.imgSize) / 2}rem`, 
        marginBottom: `${parseInt(this.props.imgSize) / 2 + parseInt(this.props.borderSize) * 2}rem`
      }}>
      <div style={{width: this.props.imgSize, height: this.props.imgSize}}>
        <img src="" alt="" style={{
          width: `calc(100% - ${parseInt(this.props.borderSize) * 2}rem)`,
          height: `calc(100% - ${parseInt(this.props.borderSize) * 2}rem)`,
          marginLeft: this.props.borderSize,
          marginTop: this.props.borderSize
        }}/>
        <p></p>
      </div>
    </div>; 
  }
}