import * as React from 'react';
import { Link } from 'react-router';
import {
  Text,
  Title,
  Button
} from "../TextComp";
const styl = require('./style.styl');

interface GoodsType {
  goodsImage?: string;
  goodsPrice?: string;
  goodsSubTitle?: string;
  inStock?: string;
  hasSold?: string;
  tags?: string[];
  sku?: string[];
}

export interface GoodsItemProps {
  className?: string;
  goodsInfo: GoodsType;
  signType?: string;
};

/**
 * GoodsItem
 */
export class GoodsItem extends React.Component<GoodsItemProps, {}>{
  public static defaultProps: GoodsItemProps = {
    goodsInfo: {
      goodsImage: null,
      goodsPrice: null,
      goodsSubTitle: null
    },
    signType: 'hasSold'
  }
  render(){
    let _classname = this.props.className ? ' ' + this.props.className : '';
    let ui_sign;
    switch(this.props.signType){
      case 'hasSold':
        ui_sign = this.props.goodsInfo.hasSold && `${this.props.goodsInfo.hasSold}人付款`;
        break;
      case 'inStock':
        ui_sign = this.props.goodsInfo.inStock && `库存${this.props.goodsInfo.inStock}件`;
        break;
    }
    return <div className={`${styl.goodsItem}${_classname} goodsItem`}>
      <img src={this.props.goodsInfo.goodsImage} alt=""/>
      <div>
        <Title className={`title`}>{this.props.children}</Title>
        <Text  className={`${styl.text} text`}>{this.props.goodsInfo.goodsSubTitle}</Text>
        <div className={`${styl.wrap} wrap`}>
          <div className={`${styl.price} price`}>￥
            <span>{this.props.goodsInfo.goodsPrice}</span>
          </div>
          <div className={`${styl.sign} sign`}>
            {ui_sign}
          </div>
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

export interface KVType {
  Key?: any;
  Value?: any;
}

class goodsSKUSimpleStatus {
  selected: string;
};

export interface GoodsSKUSimpleProps {
  className?: string;
  sku: KVType[];
  sessionId?: string;
  current?: string;
  doSelected: Function;
};

/**
 * GoodsSKUSimple
 */
export class GoodsSKUSimple extends React.Component<GoodsSKUSimpleProps, goodsSKUSimpleStatus>{
  constructor(props){
    super(props);
    this.state = {
      selected: this.props.current || ''
    };
  };

  handleSelect(sku){
    this.setState({
      selected: this.state.selected == sku ? '' : sku
    });
    let session = localStorage.getItem(this.props.sessionId);
    if (this.props.sessionId && session) {
      let data = JSON.parse(session);
      data[String(this.props.children)] = this.state.selected == sku ? '' : sku;
      this.setState({
        selected: this.state.selected == sku ? '' : sku
      })
      localStorage.setItem(this.props.sessionId, JSON.stringify(data))
    }
    this.props.doSelected(sku)
  }

  render(){
    let _classname = this.props.className ? ' ' + this.props.className : '';
    let ui_sku = this.props.sku.map((sku, index) => {
      let _activeclass = this.state.selected == sku.Value ? `active` : ''
      return <span className={_activeclass} key={index} onClick={this.handleSelect.bind(this, sku.Value)}>{sku.Key}</span> 
    })
    return <div className={`${styl.goodsSKUSimple}${_classname} goodsSKUSimple`}>
      <span>{this.props.children}</span>
      <div className={`${styl.wrap} wrap`}>
        {ui_sku}
      </div>
    </div>; 
  }
}

export interface BigBtnProps {
  className?: string;
  to?: string;
  even?: Function;
};

/**
 * BigBtn
 */
export class BigBtn extends React.Component<BigBtnProps, {}>{
  render(){
    let _classname = this.props.className ? ' ' + this.props.className : '';
    return this.props.to ? <Link to={this.props.to} className={`${styl.BigBtn}${_classname} BigBtn`}>
      {this.props.children}
    </Link> : <a onClick={this.props.even} className={`${styl.BigBtn}${_classname} BigBtn`}>{this.props.children}</a>; 
  }
}

/**
 * GoodsItemFlat
 */
export interface GoodsItemFlatProps {
  className?: string;
  goodsInfo: GoodsType;
  imagePosition?: string;
  typesetting?: string;
  isButton?: boolean;
};

export class GoodsItemFlat extends React.Component<GoodsItemFlatProps, {}>{
  public static defaultProps: GoodsItemFlatProps = {
    goodsInfo: {
      goodsImage: null,
      goodsPrice: null,
      goodsSubTitle: null,
      tags: []
    },
    imagePosition: 'left',
    isButton: false
  }

  render(){
    let _classname = this.props.className ? ` ${this.props.className}` : '';
    let _order_classname = this.props.imagePosition == 'left' || this.props.imagePosition == 'up' ? styl.front : styl.end;
    let _direction_classname = this.props.imagePosition == 'left' || this.props.imagePosition == 'right' ? styl.level : styl.vertical;
    return <div className={`${styl.goodsItemFlat}${_classname} goodsItemFlat`}>
      {this.props.goodsInfo.goodsImage && <div className={`${styl.avatar} ${_order_classname} avatar`}>
        <img src={this.props.goodsInfo.goodsImage} alt=""/>
      </div>}
      {this.props.goodsInfo.goodsImage && <div className={`${styl.split} split`}></div>}
      <div className={`${_direction_classname} ${styl.goodsWrap} goodsWrap`}>
        {(this.props.goodsInfo.tags && this.props.goodsInfo.tags.length == 1) && <span className={`${styl.tagOne} tagOne`}>
          {this.props.goodsInfo.tags[0].Value}
        </span>}
        <Title className={styl.title}>{this.props.children}</Title>
        <Text lineClamp={2}>{this.props.goodsInfo.goodsSubTitle}</Text>
        <span className={`${styl.price} price`}>￥{this.props.goodsInfo.goodsPrice}</span>
        {this.props.isButton && <Button className={`${styl.actionBtn} actionBtn`}>去看看</Button>}
      </div>
    </div>; 
  }
}

/**
 * DetailStaticWrap
 */

export interface DetailStaticWrapProps {
  className?: string;
  title: string;
};

export class DetailStaticWrap extends React.Component<DetailStaticWrapProps, {}>{
  render(){
    let _classname = this.props.className ? ' ' + this.props.className : '';
    return <div className={`${styl.detailStaticWrap}${_classname} detailStaticWrap`}>
      <Title>{this.props.title}</Title>
      {this.props.children}
    </div>; 
  }
}