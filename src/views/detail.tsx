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
  getByREST
} from '../helper/Fetch';
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
    //解决IOS下title不生效问题
    const mobile = navigator.userAgent.toLowerCase();
    const length = document.querySelectorAll('iframe').length;
    if (/iphone|ipad|ipod/.test(mobile) && !length) {
      setTimeout(function(){
        //利用iframe的onload事件刷新页面
        document.title = '商品详情';
        var iframe = document.createElement('iframe');
        iframe.style.visibility = 'hidden';
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        iframe.src = '/favicon.ico';
        iframe.onload = function () {
            setTimeout(function () {
                document.body.removeChild(iframe);
            }, 0);
        };
        document.body.appendChild(iframe);
      },0);
    } else {
      document.title = '商品详情';
    }
  }

  componentDidMount(){
    let that = this;
    getByREST(`goods/detail/${this.props.params.goodsid}?`, (data) => {
      that.setState({
        data: data.result
      })
    }, { Mobile_ShowShareButton: "Yes" });
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
                  {detail.text && <p style={{float: 'left'}}>`△ ${detail.text}`</p>}
                </div>
              })}
            </DetailStaticWrap>
          </MountAnima>}
        </div>
      </div>
      {all_stock == 0 ? <span className={skeleton.noStockBtn}>已售罄</span> : <BigBtn to={`/order/${goods_detail.goods_id}`}>立即购买</BigBtn>}
      {navigator.userAgent.indexOf('VKStaffAssistant') >= 0 && <div className={skeleton.titlebar}>
        <div onClick={() => {history.go(-1)}}>返回</div>
        <div>商品详情</div>
      </div>}
    </div>;
  }
}
