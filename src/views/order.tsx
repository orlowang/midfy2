import * as React from 'react';
import * as Relay from "react-relay";
import { Link } from 'react-router';
import {
  ItemIOS,
  ItemIOSLink
} from '../../vender.src/components/ItemIOSComp';
import {
  Counter
} from '../../vender.src/components/CounterComp';
import {
  Banner
} from '../../vender.src/components/BannerComp';
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
const skeleton = require('../assets/css/skeleton.styl');

class DetailStatus {
  orderSession: Object;
}

export interface DetailProps {};

class Detail extends React.Component<DetailProps, DetailStatus>{
  constructor(props){
    super(props);
    this.state = {
      orderSession: {}
    };
  };

  componentWillMount(){
    let goods_detail = this.props.viewer.Goods;
    let orderSessionID = `order-${goods_detail.Id}`;
    if (localStorage[orderSessionID]) {
      this.setState({
        orderSession: JSON.parse(localStorage[orderSessionID])
      })
    }
    document.body.style.backgroundColor = skeleton.mainBgColor;
  }

  render(){
    let goods_detail = this.props.viewer.Goods;
    let ui_sku = goods_detail.SKU.map((sku, index) => {
      let currentSKU = this.state.orderSession[sku.Name] || null;
      return <GoodsSKUSimple sessionId={`order-${goods_detail.Id}`} 
        className={`${skeleton.goodsSKU}`} 
        key={index} 
        sku={sku.Key}
        current={currentSKU}>
        {sku.Name}
      </GoodsSKUSimple>;
    });
    let data_goods = {
      goodsImage: goods_detail.mainPhoto,
      goodsPrice: goods_detail.Price,
      goodsSubTitle: goods_detail.subTitle,
      inStock: goods_detail.inStock
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
              <span>￥12.00</span>
              <span>0.00</span>
            </ItemIOS>
            <ItemIOS className={skeleton.itemIOS} title='数量'>
              <Counter></Counter>
            </ItemIOS>
            <ItemIOSLink link={'/address/1'}>
              <span>收货人：{`蒋先生`}</span>
              <span className={skeleton.phone}>{`13966668888`}</span>
              <p>收货地址：{`深圳市福田区梅林路万科大厦数据与信息中心住这儿部门`}</p>
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
      <BigBtn to={`/order/${goods_detail.Id}`}>付款</BigBtn>
    </div>;
  }
}

export default Relay.createContainer(Detail, {
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
          Price,
          subTitle,
          inStock,
          SKU{
            Name,
            Key
          }
        }
      }
    `
  }
})
