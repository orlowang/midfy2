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
  tags?: Object[];
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
        ui_sign = this.props.goodsInfo.inStock != null && `库存${this.props.goodsInfo.inStock}件`;
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

class goodsSKUSimpleStatus {
  selected: Map<any, any>;
};

export interface GoodsSKUSimpleProps {
  className?: string;
  sku: Map<any, any>;
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
      selected: new Map()
    };
  };

  handleSelect(sku){
    if (sku.exist){
      let types = this.mapTo();
      sku.active = !sku.active;
      this.props.doSelected(sku, types)
    }
    // let session = localStorage.getItem(this.props.sessionId);
    // if (this.props.sessionId && session) {
    //   let data = JSON.parse(session);
    //   data[String(this.props.children)] = this.state.selected == sku ? '' : sku;
    //   this.setState({
    //     selected: this.state.selected == sku ? '' : sku
    //   })
    //   localStorage.setItem(this.props.sessionId, JSON.stringify(data))
    // }
  }

  mapTo(){
    let sku_list = new Map();
    this.props.sku.forEach((sku, index) => {
      sku_list.has(sku.type) ? sku_list.get(sku.type).push(sku) : sku_list.set(sku.type, [sku]);
    })
    return sku_list;
  }

  render(){
    let _classname = this.props.className ? ' ' + this.props.className : '', ui_sku_list = [];
    this.mapTo().forEach((value, index) => {
      ui_sku_list.push(<div key={index} className={`${styl.goodsSKUSimpleList} goodsSKUSimpleList`}>
        <span>{index}</span>
        <div className={`${styl.wrap} wrap`}>
          {value.map((sku, i) => <span className={`${sku.exist ? 'normal' : 'disable'} ${sku.active ? 'active' : ''} ${sku.has ? 'has' : ''}`} key={i} onClick={this.handleSelect.bind(this, sku)}>{sku.name}</span>)}
        </div>
      </div>)
    });
    return <div className={`${styl.goodsSKUSimple}${_classname} goodsSKUSimple`}>
      {ui_sku_list}
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

  spec?:number;
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
        <img src={`${this.props.goodsInfo.goodsImage}?imageView2/2/format/jpg/q/80`} alt=""/>
      </div>}
      {this.props.goodsInfo.goodsImage && <div className={`${styl.split} split`}></div>}
      <div className={`${_direction_classname} ${styl.goodsWrap} goodsWrap`}>
        {(this.props.goodsInfo.tags && this.props.goodsInfo.tags.length == 1 && this.props.goodsInfo.tags[0].Key) && <span className={`${styl.tagOne} tagOne`}>
          {this.props.goodsInfo.tags[0].Value}
        </span>}
        <Title className={styl.title}>{this.props.children}</Title>
        <Text lineClamp={2}>{this.props.goodsInfo.goodsSubTitle}</Text>
        <span className={`${styl.price} price`}>￥{this.props.goodsInfo.goodsPrice}</span>
        {this.props.spec && <div className={styl.spec}>此商品每笔销售将有<span>{this.props.spec}</span>元捐赠到<a href={`http://blackpearl.4009515151.com/login?request_uri=http%3a%2f%2fblackpearl.4009515151.com%2fassets%2fh5%2fylplan.html`}>友邻计划</a></div>}
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