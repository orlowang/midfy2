import * as React from 'react';
import {
  Component,
  Props
} from 'react';
import { Link } from 'react-router';
import {
  SlideTouch
} from '../../vender.src/components/BannerComp';
import {
  MountAnima,
  MountAnimaShow
} from '../../vender.src/components/Animate';
import {
  Text
} from "../../vender.src/components/TextComp";
import {
  GoodsItemFlat,
  DetailStaticWrap,
  GoodsSKUSimple,
  BigBtn
} from "../../vender.src/components/MallComp";
import {
  ItemIOS
} from '../../vender.src/components/ItemIOSComp';
import {
  getByREST,
  syncCallNative
} from '../helper/Fetch';
import isOldVersion from '../helper/version';
import {
  goodsListType
} from '../helper/Types';
const skeleton = require('../assets/css/skeleton.styl');

interface DetailState {
  data?: goodsListType;
  layerState?: boolean;
}

interface DetailProps extends Props<Detail>{
  viewer: {
    Goods: any;
  },
  params: string;
};

// 重写调用原生方法
const callNative = ({ method, content }) => {
    let dataString = ''
    try {
        dataString = JSON.stringify({ method, content })
    } catch (error) {}
    if (!dataString) return
    const url = `/service/#/?native_service?data=${dataString}`
    let iframe = document.createElement("iframe")
    iframe.setAttribute('src', url)
    iframe.setAttribute('width', '0')
    iframe.setAttribute('height', '0')
    iframe.setAttribute('frameborder', '0')
    document.documentElement.appendChild(iframe)
    setTimeout(() => {
        iframe.parentNode.removeChild(iframe)
    }, 50)
}

const waitForToken = () => new Promise((resolve, reject) => {
  console.log('waitForToken pending...')
  const timeout = 3000
  const interval = 50;
  let intervalCount = 0;
  let timer = setInterval(() => {
    intervalCount += interval;
    let isReady = window.appEnvironment && window.appEnvironment.hasOwnProperty('Html_token')
    if (isReady || intervalCount > timeout) {
      console.log('waitForToken done')
      clearInterval(timer);
    }
    if (isReady) resolve(true);
    if (intervalCount > timeout) reject('waitForToken timeout');      
  }, interval)
})

export default class Detail extends React.Component<DetailProps, DetailState>{
  constructor(props){
    super(props);
    this.state = {
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
        sunshine_price: null,
        extend_product: null,
        specs: [],
        shiping: null,
        products: []
      },
      layerState: false
    };
  };
  componentWillMount(){
    document.body.style.backgroundColor = skeleton.mainBgColor;
    document.title = "商品详情";
  }

  componentDidMount(){
    
    let that = this,
        fromApp = this.props.params.code == 0,
        projcode = !fromApp ? `?projectCode=${this.props.params.code}` : '?';

    getByREST(`goods/detail/${this.props.params.goodsid}${projcode}`, (data) => {
      that.setState({
        data: data.result
      })
      callNative({
        method: "initWithBlackpearl",
        content: {
          Mobile_ShowShareButton: "Yes",
          Mobile_GoodSid: this.props.params.goodsid,
          Mobile_ConfigTitle: "商品详情"
        }
      })
    }, !fromApp);
  }

  isVersionOutdate(current, standard){
    let cargs = current.split('.');
    let sargs = standard.split('.');
    for(let i = 0; i < sargs.length; i++){
      if (parseInt(sargs[i]) > parseInt(cargs[i])) {
        return true
      }
    }
  }

  checkAppVersion(){
    let app_env = window.appEnvironment;
    let current_version_android = '3.1.0';
    let current_version_ios = '3.1.0';
    console.log(app_env)
    let check = window.setInterval(()=>{
      if (app_env) {
        let standard_version = app_env.platform != 'Android' ? current_version_ios : current_version_android;
        if (this.isVersionOutdate(app_env.appVersion, standard_version)) {
          let timer = setTimeout(() => {
            this.setState({
              layerState: true
            }, () => {
              clearTimeout(timer);
              clearInterval(check)
            })
          }, 100)
        }
      } else {
        clearInterval(check)
      }
    }, 200);
  }

  render(){
    const spec = '8fsDSU2d8fk93jsHJdmK';
    let goods_detail = this.state.data, goods_photos = [],
      g_min_p = goods_detail.min_price, g_max_p = goods_detail.max_price;
      
    let ui_detail = (page) => {
      return {
        __html: page
      }
    };
    let data_goods_info = {
      goodsImage: null,
      goodsPrice: g_min_p == g_max_p ? g_min_p : `${g_min_p} - ${g_max_p}`,
      goodsSubTitle: goods_detail.title,
      tags: [],
      flashSale: false,
      endTime: goods_detail.end_time
    };
    console.log(data_goods_info);
      
    goods_detail.head_imgs.map((photo) => {
      goods_photos.push({
        url: photo
      })
    })
    let all_stock = 0;
    goods_detail.products.map(prd => {
      all_stock += prd.stock
    })

    let setButton = () => {
      if (all_stock == 0) {
        return <span className={skeleton.noStockBtn}>已售罄</span>
      } else {
        if (isOldVersion && location.href.indexOf(spec) < 0) {
          return <BigBtn to={`/order/${goods_detail.goods_id}`}>立即购买</BigBtn>
        } else if (!isOldVersion && location.href.indexOf(spec) < 0) {
          return (window.appEnvironment && window.appEnvironment['Html_token']) ? <BigBtn to={`/order/${goods_detail.goods_id}`}>立即购买</BigBtn>: <span className={skeleton.noStockBtn}>请注册后购买</span>
        } else if (location.href.indexOf(spec) >= 0) {
          return <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.vanke.activity" className={skeleton.noStockBtn}>下载“住这儿”</a>
        }
      }
    }
console.log(setButton);

    return <div className={`${skeleton.info} info`}>
      <div className={`${skeleton.root} ${navigator.userAgent.indexOf('VKStaffAssistant') >= 0 && skeleton.hastitlebar}`}>
        <div className={skeleton.rootwrap}>
          <MountAnimaShow>
            <SlideTouch className={skeleton.slideTouch} imgList={goods_photos}></SlideTouch>
            <GoodsItemFlat lock={true} isButton={!data_goods_info.flashSale} className={skeleton.goodsInfoFlat} goodsInfo={data_goods_info} imagePosition="up" spec={goods_detail.sunshine_community && goods_detail.sunshine_price}>
              {goods_detail.name}
            </GoodsItemFlat>
          </MountAnimaShow>
          {goods_detail.text_detail != '' && <MountAnima>
            <DetailStaticWrap title={'产品描述'}>
              <pre style={{whiteSpace: 'pre-wrap', wordWrap: 'break-word'}} dangerouslySetInnerHTML={ui_detail(goods_detail.text_detail)}></pre>
            </DetailStaticWrap>
          </MountAnima>}
          {!(goods_detail.img_detail == null || goods_detail.img_detail.length == 0) && <MountAnima delay={200}>
            <DetailStaticWrap className={skeleton.detailWrap} title={'图文详情'}>
              {goods_detail.img_detail.map((detail, index) => {
                return <div key={index} style={{textAlign: 'center'}}>
                  <img src={detail.img} alt="" style={{float: 'left'}}/>
                  {detail.text && <p style={{float: 'left'}}>△ {detail.text}</p>}
                </div>
              })}
            </DetailStaticWrap>
          </MountAnima>}
        </div>
      </div>
      {setButton()}
      {navigator.userAgent.indexOf('VKStaffAssistant') >= 0 && <div className={skeleton.titlebar}>
        <div onClick={() => {history.go(-1)}}>返回</div>
        <div>商品详情</div>
      </div>}
    </div>;
  }
}
