import * as React from 'react';
import {
  Component,
  Props
} from 'react';
import { 
  Link,
  hashHistory
 } from 'react-router';
import {
  ItemIOS,
  ItemIOSLink
} from '../../vender.src/components/ItemIOSComp';
import {
  Counter
} from '../../vender.src/components/CounterComp';
import {
  MountAnima,
  MountAnimaShow
} from '../../vender.src/components/Animate';
import {
  Text
} from "../../vender.src/components/TextComp";
import {
  GoodsItem,
  GoodsSKUSimple,
  BigBtn
} from "../../vender.src/components/MallComp";
import ReverseContains from '../helper/ReverseContains';
import OrderMutation from './orderMutation';
import {
  getByREST,
  postByREST
} from '../helper/Fetch';
import {
  goodsListType,
  userInfoType
} from '../helper/Types';
import 'whatwg-fetch';
const skeleton = require('../assets/css/skeleton.styl');

interface OrderStatus {
  orderSession?: Object;
  skuMap?: Map<any, any>;
  skuStatus?: Map<any, any>;
  data?: goodsListType;
  user?: userInfoType;
}

interface OrderProps extends Props<Order>{
  relay: any;
  params: string;
  viewer: {
    Goods: any;
    userInfo: any;
  }
};

export default class Order extends React.Component<OrderProps, OrderStatus>{
  constructor(props){
    super(props);
    this.state = {
      orderSession: {},
      data: {
        goods_id: null,
        head_imgs: [],
        name: null,
        title: null,
        min_price: null,
        max_price: null,
        text_detail: null,
        img_detail: [],
        sunshine_community: null,
        extend_product: null,
        specs: [],
        shiping: null,
        products: []
      },
      user: {
        name: null,
        nickname: null,
        sex: null,
        mobile: null,
        province: null,
        city: null,
        district: null,
        road: null,
        project_name: null,
        building_name: null,
        address: null,
      }
    };
  };

  componentWillMount(){
    document.body.style.backgroundColor = skeleton.mainBgColor;

    // ReverseContains(this.state.data.products, 'Property')
  }

  componentDidMount(){
    let that = this;
    getByREST(`goods/detail/${this.props.params.goodsid}`, (data) => {
      that.setState({
        data: data.result
      }, () => this.state.data.goods_id && that.createOrder(`order-${this.state.data.goods_id}`))
    });
    getByREST(`addr/detail`, (data) => {
      that.setState({
        user: data.result
      })
    });
  }

  componentWillUnmount(){
    let goods_detail = this.state.data;
    let orderSessionID = `order-${goods_detail.goods_id}`;
    // this.removeOrder(orderSessionID)
  }

  createOrder(SID){
    if (!localStorage[SID]) {
      let data = {
        goods: null,
        goods_num: null,
        goods_sku: null,
        shiping: null,
        order_price: null,
        consignee: null,
        mobile: null,
        address: null,
        pay_type: null
      };
      localStorage.setItem(SID, JSON.stringify(data))
    } else {
      this.setState({
        orderSession: JSON.parse(localStorage[SID])
      })
    }
  }

  setOrder(sku, key){
    let products = this.state.data.products;
    let sku_map = this.state.skuMap;
    let session = JSON.parse(localStorage[`order-${this.state.data.goods_id}`]);
    
    console.log(session)
    products.map((product) => {
      let stock = product.stock;
      let skus = product.property;
      let sku = products.sku;
      if(stock == 0){
        this.setState({
          skuStatus: new Map()  
        })
      }
    })
  }

  getCount(value){
    let sessionId = `order-${this.state.data.goods_id}`;
    let session = JSON.parse(localStorage[sessionId]);
    console.log(value)
    session['goods_num'] = value;
  }

  sendOrder(){
    let sessionId = `order-${this.state.data.goods_id}`;
    let session = JSON.parse(localStorage[sessionId]);
    
    // 创建完整订单, 有些(etc.运费、付款方式、手机号)暂时无法修改，故子再此使用初始化值
    session['shiping'] = this.state.data.shiping;
    session['mobile'] = this.state.user.mobile;
    session['pay_type'] = 'wechat';

    postByREST('order/create', {}, (info) => {
      console.log(info)
      // 拉起支付,(fetch或者router跳转)location
      if (info.result && info.result.order_id) {
        location.href = `/pay?data={"method":"SPay","content":{"orderId":"${info.result.order_id},"orderPrice":${info.result.price}}}`;
      } else {
        // 订单提交失败
      }
    })

    this.removeOrder(sessionId)
  }

  removeOrder(SID){
    localStorage[SID] && localStorage.removeItem(SID)
  }

  render(){
    let ordersession = localStorage[`order-${this.props.params.goodsid}`];
    let session = ordersession && JSON.parse(ordersession);
    console.log(session)
    let goods_detail = this.state.data,
      g_min_p = goods_detail.min_price, g_max_p = goods_detail.max_price;
    let ui_sku = goods_detail.specs.map((sku, index) => {
      let currentSKU = this.state.orderSession[sku.name] || null;
      return <GoodsSKUSimple sessionId={`order-${goods_detail.goods_id}`} 
        className={`${skeleton.goodsSKU}`} 
        key={index} 
        sku={sku.entrys.map((entry) => {
          return {
            Key: entry.value,
            Value: entry.entry_id,
          }
        })}
        current={currentSKU} 
        doSelected={this.setOrder.bind(this, sku.name)}>
        {sku.name}
      </GoodsSKUSimple>;
    });
    let data_goods = {
      goodsImage: goods_detail.head_imgs[0],
      goodsPrice: g_min_p == g_max_p ? g_min_p : `${g_min_p} - ${g_max_p}`,
      goodsSubTitle: goods_detail.title,
      inStock: goods_detail.products.length == 1 && goods_detail.products.stock
    };
    let user = this.state.user, usr_name;
    usr_name = user.name ? (user.sex == 2 ? `${user.nickname}女士` : `${user.nickname}先生`) : user.nickname;
    return <div className={`${skeleton.order} order`}>
      <div className={skeleton.root}>
        <div className={skeleton.rootwrap}>
          <MountAnima>
            <div className={`${skeleton.detail} detail`}>
              <GoodsItem goodsInfo={data_goods} signType={'inStock'}>
                {goods_detail.name}
              </GoodsItem>
            </div>
            {ui_sku}
            <ItemIOS className={skeleton.fare} title="运费">
              <span></span>
              <span>￥{goods_detail.shiping}</span>
            </ItemIOS>
            <ItemIOS className={skeleton.itemIOS} title='数量'>
              <Counter complete={this.getCount.bind(this)} current={1}></Counter>
            </ItemIOS>
            <ItemIOSLink link={`/address/${goods_detail.goods_id}`}>
              <div className={skeleton.flexwrap}>
                <span><span>收货人：{(session && session.consignee) || usr_name}</span></span>
                <span className={skeleton.phone}>{this.state.user.mobile}</span>
              </div>
              <p>收货地址：{this.state.orderSession['address'] || this.state.user.address}</p>
            </ItemIOSLink>
            <ItemIOS className={skeleton.weixin} title="付款方式">
              <span>微信支付</span>
            </ItemIOS>
            <ItemIOS className={skeleton.total} title="合计金额">
              <span>￥12.00</span>
            </ItemIOS>
          </MountAnima>
        </div>
      </div>
      <BigBtn even={this.sendOrder.bind(this)}>付款</BigBtn>
    </div>;
  }
}
