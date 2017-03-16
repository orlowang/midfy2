import * as React from 'react';
const styl = require('./style.styl');

export interface TableProps {
  className?: string;
};
/**
 * Table
 */
export class Table extends React.Component<TableProps, {}>{
  render(){
    let _classname = this.props.className ? ' ' + this.props.className : '';
    return <div className={`${styl.base}${_classname} tableComp`}>
      <p>{this.props.children}</p>
    </div>; 
  }
}