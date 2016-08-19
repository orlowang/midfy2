import * as React from 'react';
import { Link } from 'react-router';
const styl = require('./style.styl');

export interface ItemIOSProps {
  className?: string;
  title: string;
};

/**
 * ItemIOS
 */
export class ItemIOS extends React.Component<ItemIOSProps, {}>{
  render(){
    let _classname = this.props.className ? ' ' + this.props.className : '';
    return <div className={`${styl.itemIOS}${_classname} itemIOS`}>
      <span>{this.props.title}</span>
      <div className={styl.wrap}>{this.props.children}</div>
    </div>; 
  }
}

export interface ItemIOSLinkProps {
  className?: string;
  link: string;
};

/**
 * ItemIOSLink
 */
export class ItemIOSLink extends React.Component<ItemIOSLinkProps, {}>{
  render(){
    let _classname = this.props.className ? ' ' + this.props.className : '';
    return <Link to={this.props.link} className={`${styl.itemIOSLink}${_classname} itemIOSLink`}>
      <div className={`${styl.wrap} wrap`}>{this.props.children}</div>
      <span className={`${styl.arr} arr`}></span>
    </Link>; 
  }
}