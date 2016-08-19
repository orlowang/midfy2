import * as React from 'react';
const styl = require('./style.styl');

export interface SquareArrowProps {
  className?: string;
  direction?: string;
};

/**
 * SquareArrow
 */
export class SquareArrow extends React.Component<SquareArrowProps, {}>{
  render(){
    let _classname = this.props.className ? ' ' + this.props.className : '';
    let ui_arrow;
    switch(this.props.direction){
      case "":
        ui_arrow = '';
        break;
    }
    return <div className={`${styl.SquareArrow}${_classname} SquareArrow`}>
      {ui_arrow}
    </div>; 
  }
}
