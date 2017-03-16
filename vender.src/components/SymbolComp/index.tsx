import * as React from 'react';
const styl = require('./style.styl');

export interface SquareArrowProps {
  className?: string;
  direction?: string;
  borderWidth?: number;
  radius?: number;
};

/**
 * SquareArrow
 */
export class SquareArrow extends React.Component<SquareArrowProps, {}>{
  public static defaultProps: SquareArrowProps = {
    direction: 'right',
    borderWidth: 1,
    radius: 0
  }

  render(){
    let _classname = this.props.className ? ' ' + this.props.className : '';
    let style = {
      borderTopWidth: `${this.props.borderWidth}px`
    };
    return <div className={`${styl.SquareArrow}${_classname} squareArrow`}>
      <span className={`${styl.arrow} ${styl[this.props.direction]}`}>
        <i style={Object.assign(style, {
          borderRadius: `${this.props.radius}px 0 0 ${this.props.radius}px`
        })}></i>
        <i style={Object.assign(style, {
          borderRadius: `0 ${this.props.radius}px ${this.props.radius}px 0`
        })}></i>
      </span>
    </div>; 
  }
}
