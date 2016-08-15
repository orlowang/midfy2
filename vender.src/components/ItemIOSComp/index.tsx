import * as React from 'react';
const styl = require('./style.styl');

export interface ItemIOSProps {
  className?: string;
  title: string;
};

/**
 * ItemIOS
 */
export class ItemIOS extends React.Component<ItemIOSProps, {}>{
  refs : {
    [key: string]: (Element);
    ItemIOS: (HTMLInputElement)
  }

  handleReduce(){

  }

  handlePlus(){

  }

  render(){
    let _classname = this.props.className ? ' ' + this.props.className : '';
    return <div className={`${styl.itemIOS}${_classname} itemIOS`}>
      <span>{this.props.title}</span>
      <div className={styl.wrap}>{this.props.children}</div>
    </div>; 
  }
}