import * as React from 'react';
const styl = require('./style.styl');
import {
  Link
} from 'react-router';
import {
  Title
} from '../TextComp';
import {
  ArrowS1
} from '../ShapeComp';

class ListType {
  id: string;
  name: string;
  icon: string[];
  url: string;
  child: [
    {
      id: string;
      name: string;
      icon: string[];
      url: string;
    }
  ]
};

export interface MenuProps {
  className?: string;
  lists: ListType[];
  singleOpen?: boolean;
};

export interface MenuState {
  openditem: string[]
};

/**
 * Title
 */
export class Menu extends React.Component<MenuProps, MenuState>{
  constructor(props){
    super(props);
    this.state = {
      openditem: []
    };
  };

  openSubmenu(item){
    this.setState({
      openditem: this.state.openditem != item ? [item] : []
    })
  }

  render(){
    let _classname = this.props.className ? ' ' + this.props.className : '';
    const ui_list = this.props.lists.map((list, index) => {
      let ui_child_list = (list.child && this.state.openditem[0] == list.id ) && <ul className={styl.child}>{
        list.child.map((sublist, index) => {
          return <li key={sublist.id}>
            <Link to={`/${sublist.url}`} activeClassName={`active`}>
              <Title className={styl.titleComp}>
                {sublist.name}
              </Title>
            </Link>
          </li>;
        })
      }</ul>;

      return <li key={list.id}>
        {list.child ? <a onClick={this.openSubmenu.bind(this, list.id)}>
          <Title className={styl.titleComp}>
            {list.name}
          </Title>
          <ArrowS1 className={styl.arrs}></ArrowS1>
        </a> : <Link to={`/${list.url}`} activeClassName={`active`}>
          <Title className={styl.titleComp}>
            {list.name}
          </Title>
        </Link>}
        {ui_child_list}
      </li>;
    });
    return <ul className={`${styl.base}${_classname} menuComp`}>{ui_list}</ul>; 
  }
}