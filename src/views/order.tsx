import * as React from 'react';
import {
  Component,
  Props
} from 'react';
import * as Relay from "react-relay";
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
import 'whatwg-fetch';
const skeleton = require('../assets/css/skeleton.styl');

interface OrderStatus {
  orderSession?: Object;
  skuMap?: Map<any, any>;
  skuStatus?: Map<any, any>;
}

interface OrderProps extends Props<Order>{
  relay: any;
  viewer: {
    Goods: any;
    userInfo: any;
  }
};

class Order extends React.Component<OrderProps, OrderStatus>{
  constructor(props){
    super(props);
    this.state = {
      orderSession: {},
      skuMap: ReverseContains(this.props.viewer.Goods.Products, 'Property')
    };
  };

  componentWillMount(){
    let goods_detail = this.props.viewer.Goods;
    let orderSessionID = `order-${goods_detail.Id}`;
    this.createOrder(orderSessionID)
    document.body.style.backgroundColor = skeleton.mainBgColor;
  }

  componentWillUnmount(){
    let goods_detail = this.props.viewer.Goods;
    let orderSessionID = `order-${goods_detail.Id}`;
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
    let products = this.props.viewer.Goods.Products;
    let sku_map = this.state.skuMap;
    let session = JSON.parse(localStorage[`order-${this.props.viewer.Goods.Id}`]);

    
    console.log(session)
    products.map((product) => {
      let stock = product.Stock;
      let skus = product.Property;
      let sku = products.SKU;
      if(stock == 0){
        this.setState({
          skuStatus: new Map()  
        })
      }
    })
  }

  removeOrder(SID){
    localStorage[SID] && localStorage.removeItem(SID)
  }

  sendOrder(){
    let session = JSON.parse(localStorage[`order-${this.props.viewer.Goods.Id}`]);
    let onSuccess = (data) => {
      console.log(data)
      console.log('SUccess!');

      // 拉起支付,(fetch或者router跳转)location
      if (data.order && data.order.orderId) {
        location.href = `/pay?data={"method":"SPay","content":{"orderId":"${data.order.orderId},"orderPrice":${data.order.price}}}`;
      }
    }
    let onFailure = (transaction) => {
      let err = transaction.getError() || new Error('Mutation failed.');
      console.log(err)
    }

    session.goods = {
      goods_id: "{type: GraphQLString}",
      product_id: "{type: GraphQLString}",
      num: 234,
      price: 234
    }

    this.props.relay.commitUpdate(
      new OrderMutation({
        goods: session.goods,
        goods_num: session.goods_num,
        shiping: session.shiping,
        order_price: session.order_price,
        consignee: session.consignee,
        mobile: session.mobile,
        address: session.address,
        pay_type: session.pay_type
      }), 
      {onFailure, onSuccess}
    )
  }

  render(){
    let goods_detail = this.props.viewer.Goods;
    let ui_sku = goods_detail.SKU.map((sku, index) => {
      let currentSKU = this.state.orderSession[sku.Name] || null;
      return <GoodsSKUSimple sessionId={`order-${goods_detail.Id}`} 
        className={`${skeleton.goodsSKU}`} 
        key={index} 
        sku={sku.Key}
        current={currentSKU} 
        doSelected={this.setOrder.bind(this, sku.Name)}>
        {sku.Name}
      </GoodsSKUSimple>;
    });
    let data_goods = {
      goodsImage: goods_detail.mainPhoto,
      goodsPrice: `${goods_detail.minPrice} - ${goods_detail.maxPrice}`,
      goodsSubTitle: goods_detail.subTitle,
      inStock: goods_detail.Products.length == 1 && goods_detail.Products.Stock
    };
    return <div className={`${skeleton.order} order`}>
      <div className={skeleton.root}>
        <div className={skeleton.rootwrap}>
          <MountAnima>
            <div className={`${skeleton.detail} detail`}>
              <GoodsItem goodsInfo={data_goods} signType={'inStock'}>
                {goods_detail.Name}
              </GoodsItem>
            </div>
            {ui_sku}
            <ItemIOS className={skeleton.fare} title="运费">
              <span></span>
              <span>￥{goods_detail.Shiping}</span>
            </ItemIOS>
            <ItemIOS className={skeleton.itemIOS} title='数量'>
              <Counter current={1}></Counter>
            </ItemIOS>
            <ItemIOSLink link={`/address/${goods_detail.Id}`}>
              <span>收货人：{this.props.viewer.userInfo.name}</span>
              <span className={skeleton.phone}>{this.props.viewer.userInfo.mobile}</span>
              <p>收货地址：{this.state.orderSession['address'] || this.props.viewer.userInfo.address}</p>
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

export default Relay.createContainer(Order, {
  initialVariables: {
    goodsid: null
  },
  fragments: {
    viewer: () => Relay.QL`
      fragments on Viewer {
        Goods(id: $goodsid){
          Id,
          Name,
          mainPhoto,
          minPrice,
          maxPrice,
          subTitle,
          Products{
            productId,
            Price,
            Stock,
            Property
          },
          inStock,
          SKU{
            Name,
            Key{
              Key,
              Value
            }
          },
          Shiping
        },
        userInfo{
          name,
          sex,
          nickname,
          mobile,
          province,
          city,
          district,
          road,
          project_name,
          building_name,
          address,
        }
      }
    `
  }
})
