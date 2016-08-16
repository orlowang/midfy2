import * as React from 'react';
import { Link } from 'react-router';
import {
  Text
} from "../TextComp";
const styl = require('./style.styl');

class GoodsType {
  goodsImage: string;
  goodsPrice: string;
  inStock: string;
  hasSold: string;
  tags: string[];
}

export interface GoodsItemProps {
  className?: string;
  goodsInfo: GoodsType;
};

/**
 * GoodsItem
 */
export class GoodsItem extends React.Component<GoodsItemProps, {}>{
  render(){
    let _classname = this.props.className ? ' ' + this.props.className : '';
    return <div className={`${styl.goodsItem}${_classname} goodsItem`}>
      <img src={this.props.goodsInfo.goodsImage} alt=""/>
      <div>
        <Text className={`title`}>{this.props.children}</Text>
        <div className={`${styl.wrap} wrap`}>
          <div className={`${styl.price} price`}>￥
            <span>{this.props.goodsInfo.goodsPrice}</span>
          </div>
          <div className={`${styl.sign} sign`}>{this.props.goodsInfo.hasSold}人付款</div>
        </div>
      </div>
    </div>; 
  }
}


export interface GoodsItemSimpleProps {
  className?: string;
  goodsPrice: number;
  goodsSign: number;
};

/**
 * GoodsItemSimple
 */
export class GoodsItemSimple extends React.Component<GoodsItemSimpleProps, {}>{
  render(){
    let _classname = this.props.className ? ' ' + this.props.className : '';
    return <div className={`${styl.goodsItemSimple}${_classname} goodsItemSimple`}>
      <Text className={`title`}>{this.props.children}</Text>
      <div className={`${styl.wrap} wrap`}>
        <div className={`${styl.price} price`}>￥
          <span>{this.props.goodsPrice}</span>
        </div>
        <div className={`${styl.sign} sign`}>{this.props.goodsSign}人付款</div>
      </div>
    </div>; 
  }
}

class goodsKUASimpleStatus {
  selected: string;
};

export interface GoodsKUASimpleProps {
  className?: string;
  kuas: string[];
  sessionId?: string;
  current?: string;
};

/**
 * GoodsKUASimple
 */
export class GoodsKUASimple extends React.Component<GoodsKUASimpleProps, goodsKUASimpleStatus>{
  constructor(props){
    super(props);
    this.state = {
      selected: this.props.current || ''
    };
  };

  handleSelect(kua){
    this.setState({
      selected: this.state.selected == kua ? '' : kua
    });
    let session = localStorage.getItem(this.props.sessionId);
    if (this.props.sessionId && session) {
      let data = JSON.parse(session);
      data[String(this.props.children)] = this.state.selected == kua ? '' : kua;
      this.setState({
        selected: this.state.selected == kua ? '' : kua
      })
      localStorage.setItem(this.props.sessionId, JSON.stringify(data))
    }
  }

  render(){
    let _classname = this.props.className ? ' ' + this.props.className : '';
    let ui_kuas = this.props.kuas.map((kua, index) => {
      let _activeclass = this.state.selected == kua ? `active` : ''
      return <span className={_activeclass} key={index} onClick={this.handleSelect.bind(this, kua)}>{kua}</span> 
    })
    return <div className={`${styl.goodsKUASimple}${_classname} goodsKUASimple`}>
      <span>{this.props.children}</span>
      <div className={`${styl.wrap} wrap`}>
        {ui_kuas}
      </div>
    </div>; 
  }
}

export interface BigBtnProps {
  className?: string;
  to: string;
};

/**
 * BigBtn
 */
export class BigBtn extends React.Component<BigBtnProps, {}>{
  render(){
    let _classname = this.props.className ? ' ' + this.props.className : '';
    return <Link to={this.props.to} className={`${styl.BigBtn}${_classname} BigBtn`}>
      {this.props.children}
    </Link>; 
  }
}