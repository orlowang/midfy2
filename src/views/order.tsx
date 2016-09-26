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
import { 
  ReverseContains
} from '../helper/ReverseContains';
import {
  getByREST,
  postByREST
} from '../helper/Fetch';
import {
  goodsListType,
  userInfoType
} from '../helper/Types';
import * as _ from 'lodash';
import 'whatwg-fetch';
const skeleton = require('../assets/css/skeleton.styl');

interface OrderStatus {
  orderSession?: Object;
  updateInfo?: Object;
  skuStatus?: Map<any, any>;
  data?: goodsListType;
  user?: userInfoType;
  text?: string;
}

interface OrderProps extends Props<Order>{
  relay: any;
  params: {goodsid:string};
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
      },
      skuStatus: new Map(),
      updateInfo: {
        price: null,
        stock: null,
        orderPrice: null
      },
      text: '付款'
    };
  };

  componentWillMount(){
    document.body.style.backgroundColor = skeleton.mainBgColor;
    this.updateOrderSession(`order-${this.props.params.goodsid}`);
    document.title = "订单详情";
    //解决IOS下title不生效问题
    const mobile = navigator.userAgent.toLowerCase();
    const length = document.querySelectorAll('iframe').length;
    if (/iphone|ipad|ipod/.test(mobile) && !length) {
      const iframe = document.createElement('iframe');
      iframe.style.cssText = 'display: none; width: 0; height: 0;';
      iframe.setAttribute('src', 'about:blank');
      iframe.addEventListener('load', () => {
        setTimeout(() => {
          iframe.removeEventListener('load', false);
          document.body.removeChild(iframe);
        }, 0);
      });
      document.body.appendChild(iframe);
    }

    let check = setInterval(() => {
      if (window.msg && window.msg == 'success') {
        window.msg = null;
        location.replace('./');
        // hashHistory.push('/');
        clearInterval(check);
      }
    }, 10);
  }

  componentDidMount(){
    let that = this;
    const sessionId = `order-${this.props.params.goodsid}`;
    const usrSessionId = 'usertmp';
    getByREST(`goods/detail/${this.props.params.goodsid}`, (data) => {
      that.setState({
        data: data.result
      }, () => {
        const statedata = this.state.data;
        const session = JSON.parse(localStorage.getItem(sessionId));
        // 创建完整订单, 有些(etc.运费、付款方式、手机号)暂时无法修改，故子再此使用初始化值 ---01
        session['shiping'] = this.state.data.shiping;
        // session['pay_type'] = 'wechat';
        session['goods_num'] = 1;
        if(this.state.data.specs.length == 0){
          session['goods'] = [{
            product_id: this.state.data.products[0].product_id,
            goods_id: this.state.data.goods_id,
            price: this.state.data.products[0].price,
            num: 1
          }];
          session['order_price'] = parseFloat((this.state.data.products[0].price).replace(',', '')) + parseFloat(this.state.data.shiping);
        }
        that.updateOrderSession(sessionId, session);

        
        // 将sku重排列后存储
        let skupctree = ReverseContains(this.state.data.products, 'property');
        skupctree.forEach((value, index) => {
          let stock = 0;
          value.child.map(prd => {
            stock += parseInt(prd.stock)
          })
          this.state.data.specs.map((spec => {
            let type_name = spec.name;
            spec.entrys.map(entry => {
              if (index == entry.entry_id) {
                value['id'] = index;
                value['name'] = entry.value;
                value['type'] = type_name;
                value['exist'] = value.child.length >= 1 && stock != 0;
                value['active'] = false;
                value['has'] = false;
              }
            })
          }))
        })
        // localStorage.setItem('skutmp', JSON.stringify([...skupctree]))
        console.log(this.state.data.products[0].stock)
        that.setState({
          skuStatus: skupctree,
          updateInfo: {
            price: statedata.min_price == statedata.max_price ? statedata.min_price : `${statedata.min_price} - ${statedata.max_price}`,
            stock: (session.goods && session.goods.length == 1) ? this.state.data.products[0].stock : null,
            orderPrice: session.order_price
          }
        })
        localStorage.setItem('usrselectmp', JSON.stringify(this.state.data.products));
      })
    });
    
    getByREST(`addr/detail`, (data) => {
      that.setState({
        user: data.result
      }, () => {
        const session = JSON.parse(localStorage.getItem(sessionId));
        const usrSession = localStorage.getItem(usrSessionId);
        let usrInfo = usrSession && usrSession.split(':');
        
        // 创建完整订单, 有些(etc.运费、付款方式、手机号)暂时无法修改，故子再此使用初始化值 ---02
        session['mobile'] = this.state.user.mobile;
        session['consignee'] = (usrInfo && usrInfo[0]) || this.badCodeSetName();
        session['address'] = ((usrInfo && usrInfo[1]) && `${this.state.user.province}${this.state.user.city}${this.state.user.district}${this.state.user.road}${this.state.user.project_name}${usrInfo[1]}`) || this.state.user.address;
        that.updateOrderSession(sessionId, session);
      })
    });
  }

  componentWillUnmount(){
    let goods_detail = this.state.data;
    let orderSessionID = `order-${goods_detail.goods_id}`;
    // 删除本地订单缓存
    this.removeOrder(orderSessionID)
  }

  badCodeSetName(){
    let user = this.state.user;
    return user.name ? (user.sex == 2 ? `${user.nickname}女士` : `${user.nickname}先生`) : user.nickname;
  }

  updateOrderSession(SID, data?: any){
    if (!localStorage[SID]) {
      let _data = {
        goods: [],
        goods_num: null,
        shiping: null,
        order_price: null,
        consignee: null,
        mobile: null,
        address: null
      };
      localStorage.setItem(SID, JSON.stringify(_data))
    } else {
      localStorage.setItem(SID, JSON.stringify(data) || localStorage[SID]);
      this.setState({
        orderSession: JSON.stringify(data) || localStorage[SID]
      })
    }
  }

  setOrder(key, types){
    let orderstate = this.state.skuStatus;
    let current = orderstate.get(key.id);

    types.get(current.type).map(value => {
      let _tmp = orderstate.get(value.id);
      (value.active == true && value.id != key.id) &&  (_tmp.active = false);
      orderstate.set(value.id, _tmp)
    });

    // current.active = !current.active;
    orderstate.set(key.id, current)

    // 将选择产品列表存储于本地
    if (!localStorage['usrselect']) {
      localStorage.setItem('usrselect', JSON.stringify(current.child))
    }
    let orderSelect = JSON.parse(localStorage.getItem('usrselect'));
    let orderSelectmp = JSON.parse(localStorage.getItem('usrselectmp'));
    let newSelect = [];
    orderSelect.map(prd => {
      current.child.map(c_prd => {
        c_prd.product_id == prd.product_id && newSelect.push(prd);
      })
    })
    console.log(orderSelectmp)

    if (!current.active) {
      localStorage.setItem('usrselect', JSON.stringify(orderSelectmp));
    } else {
      localStorage.setItem('usrselect', JSON.stringify(newSelect));
      if (JSON.parse(localStorage.getItem('usrselectmp')).length != this.state.data.products.length) {
        localStorage.setItem('usrselectmp', JSON.stringify(orderSelect));
      }
    }
    console.log(newSelect)
    // if (newSelect.length == 0) {
    //   localStorage.setItem('usrselect', JSON.stringify(current.child))
    // } else {
    //   localStorage.setItem('usrselect', JSON.stringify(newSelect));
    // }
    
    let newselectRCkeys = ReverseContains(JSON.parse(localStorage.getItem('usrselect')), 'property');
    orderstate.forEach((value, index) => {
      value.exist = newselectRCkeys.has(index)
    })
    
    this.setState({
      skuStatus: orderstate
    })

    let orderSessionID = `order-${this.props.params.goodsid}`;
    let updateorder = JSON.parse(localStorage.getItem(orderSessionID));
    let isOne = JSON.parse(localStorage.getItem('usrselect'));
    if (isOne.length == 1) {
      updateorder.goods = [{
        goods_id: this.state.data.goods_id,
        product_id: isOne[0].product_id,
        price: isOne[0].price,
        num: updateorder.goods_num,
      }];
      if (updateorder.goods_num >= 1) {
        this.setState({
          updateInfo: {
            price: isOne[0].price,
            stock: isOne[0].stock,
            orderPrice: (parseFloat((isOne[0].price).replace(',', '')) * parseFloat(updateorder.goods_num) + parseFloat(updateorder.shiping)).toFixed(2)
          }
        })
      }
    } else {
      updateorder.goods = []
    }

    this.updateOrderSession(orderSessionID, updateorder);
  }

  getCount(value){
    let sessionId = `order-${this.props.params.goodsid}`;
    let session = JSON.parse(localStorage[sessionId]);
    if (!localStorage['usrselect'] && this.state.data.products.length == 1) {
      localStorage.setItem('usrselect', JSON.stringify(this.state.data.products))
    }
    let isOne = JSON.parse(localStorage.getItem('usrselect'));
    session['goods_num'] = value;
    console.log(isOne)
    if (session.goods.length == 1) {
      this.setState({
        updateInfo: {
          price: session.goods[0].price,
          stock: parseInt(isOne[0].stock),
          orderPrice: (parseFloat(session.goods[0].price) * parseFloat(session.goods_num) + parseFloat(session.shiping)).toFixed(2)
        }
      })
      session['goods'][0]['num'] = value;
    }
    this.updateOrderSession(sessionId, session);
  }

  sendOrder(){
    let sessionId = `order-${this.props.params.goodsid}`;

    let session = JSON.parse(localStorage[sessionId]);
    if(session.goods.length != 1){
      alert('请选择商品规格！');
      return;
    }
    if(session.goods_num >= 1){
      console.log(session)
      session.order_price = (parseFloat(session.goods[0].price) * parseFloat(session.goods_num) + parseFloat(session.shiping)).toFixed(2)
    }
    localStorage.setItem(sessionId, JSON.stringify(session));
    // this.setState({
    //   text: '付款中...'
    // })
    console.log(localStorage[sessionId])
    postByREST('order/create', localStorage[sessionId], (info) => {
      console.log(info)
      // 拉起支付,(fetch或者router跳转)location
      if(info.code != 0){
        alert('订单提交失败');
        return;
      }
      if (info.result && info.result.order_id) {
        let ua = navigator.userAgent;
        if (ua.indexOf('Android') >= 0 || ua.indexOf('Adr') >= 0) {
          //原生连接桥
          var nativeBridge = {
              invoke: function (commandName, args) {
                  console.log(commandName + ": " + JSON.stringify(args, null, 2));
                  
              window.location = 'js-call:' + commandName + ':' + encodeURIComponent(JSON.stringify(args));
              }
          };
          //如果是原生直接有的方法
          if (window.imageListener) {
              imageListener.WFTPayJS(JSON.stringify(info.result.order_id));
          } else {
          //如果是web通过与原生的连接桥,来调用原生暴露的接口
            nativeBridge.invoke('WFTPayJS', info.result.order_id);
          }
        } else {
          let pay_uri = encodeURI(`/native_service?data={"method": "SPay", "content": {"orderId": ${String(info.result.order_id)}, "orderPrice": ${session.order_price}}}`);
          console.log(pay_uri)
          location.href = pay_uri;
        }
      } else {
        alert('订单提交失败');
        return;
      }
    })

    // 删除本地订单缓存
    this.removeOrder(sessionId)
  }

  removeOrder(SID){
    localStorage[SID] && localStorage.removeItem(SID)
    localStorage['usertmp'] && localStorage.removeItem('usertmp')
    localStorage['skutmp'] && localStorage.removeItem('skutmp')
    localStorage['usrselect'] && localStorage.removeItem('usrselect')
    localStorage['usrselectmp'] && localStorage.removeItem('usrselectmp')
  }

  updateInfo(prd, count){
    if (prd.length == 0 && count) {

      // this.setState({
      //   updateInfo: 
      // })
    }
  }

  render(){
    let ordersession = localStorage[`order-${this.props.params.goodsid}`];
    let session = ordersession && JSON.parse(ordersession);
    let goods_detail = this.state.data,
      g_min_p = goods_detail.min_price, g_max_p = goods_detail.max_price;
    let data_goods = {
      goodsImage: goods_detail.head_imgs[0],
      goodsPrice: this.state.updateInfo.price,
      goodsSubTitle: goods_detail.title,
      inStock: this.state.updateInfo.stock
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
            <GoodsSKUSimple sessionId={'skutmp'} 
              className={`${skeleton.goodsSKU}`} 
              sku={this.state.skuStatus}
              doSelected={this.setOrder.bind(this)}>
            </GoodsSKUSimple>
            <ItemIOS className={skeleton.fare} title="运费">
              <span></span>
              <span>￥{goods_detail.shiping}</span>
            </ItemIOS>
            <ItemIOS className={skeleton.itemIOS} title='数量'>
              <Counter complete={this.getCount.bind(this)} current={1} max={this.state.updateInfo.stock}></Counter>
            </ItemIOS>
            <ItemIOSLink link={`/address/${goods_detail.goods_id}`}>
              <div className={skeleton.flexwrap}>
                <span><span>收货人：{session.consignee}</span></span>
                <span className={skeleton.phone}>{this.state.user.mobile}</span>
              </div>
              <p>收货地址：{session.address}</p>
            </ItemIOSLink>
            <ItemIOS className={skeleton.weixin} title="付款方式">
              <span>微信支付</span>
            </ItemIOS>
            <ItemIOS className={skeleton.total} title="合计金额">
              <span>{this.state.updateInfo.orderPrice ? `￥${this.state.updateInfo.orderPrice}` : ''}</span>
            </ItemIOS>
          </MountAnima>
        </div>
      </div>
      <BigBtn even={this.sendOrder.bind(this)}>{this.state.text}</BigBtn>
    </div>;
  }
}
