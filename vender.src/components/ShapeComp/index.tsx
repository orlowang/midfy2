import * as React from 'react';
const styl = require('./style.styl');

export interface ArrowS1Props {
  className?: string;
  direction?: string;
};

/**
 * Title
 */
export class ArrowS1 extends React.Component<ArrowS1Props, {}>{

  render(){
    let _direc = this.props.direction || '2rem';
    let _classname = this.props.className ? ' ' + this.props.className : '';
    return <span className={`${styl.base}${_classname} arrowS1Comp`}>
      <i style={{}}></i>
      <i style={{}}></i>
    </span>; 
  }
}