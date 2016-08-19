import * as React from 'react';
import {
  Motion,
  spring
} from "react-motion";
const styl = require('./style.styl');

export interface MountAnimaProps {
  type?: string;
  delay?: number;
};

/**
 * MountAnima
 */
export class MountAnima extends React.Component<MountAnimaProps, {}>{
  render(){
    return <Motion defaultStyle={{y: 20, o: .2}} style={{y: spring(0), o: spring(1)}}>
      {({y, o}) => <div style={{
        WebkitTransform: `translate3d(0, ${y}rem, 0)`,
        transform: `translate3d(0, ${y}rem, 0)`,
        opacity: o
      }}>
        {this.props.children}
      </div>}
    </Motion>; 
  }
}

/**
 * MountAnimaShow
 */
export class MountAnimaShow extends React.Component<MountAnimaProps, {}>{
  render(){
    return <Motion defaultStyle={{o: .2}} style={{o: spring(1)}}>
      {({y, o}) => <div style={{opacity: o}}>
        {this.props.children}
      </div>}
    </Motion>; 
  }
}