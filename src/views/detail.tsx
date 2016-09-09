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
  data: goodsListType;
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
        extend_product: null,
        specs: [],
        shiping: null,
        products: []
      }
    };
  };
  componentWillMount(){
    document.body.style.backgroundColor = skeleton.mainBgColor;
  }

  componentDidMount(){
    let that = this;
    getByREST(`goods/detail/${this.props.params.goodsid}`, (data) => {
      that.setState({
        data: data.result
      })
    });
  }

  render(){
    console.log(this.state.data)
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
      tags: [{
        Key: goods_detail.sunshine_community,
        Value: <img src={require(`../assets/img/sun_icon.svg`)} alt=""/>
      }]
    };
    goods_detail.head_imgs.map((photo) => {
      goods_photos.push({
        url: photo
      })
    })

    return <div className={`${skeleton.info} info`}>
      <div className={skeleton.root}>
        <div className={skeleton.rootwrap}>
          <MountAnimaShow>
            <SlideTouch className={skeleton.slideTouch} imgList={goods_photos}></SlideTouch>
            <GoodsItemFlat className={skeleton.goodsInfoFlat} goodsInfo={data_goods_info} imagePosition="up">
              {goods_detail.name}
            </GoodsItemFlat>
          </MountAnimaShow>
          <MountAnima>
            <DetailStaticWrap title={'产品描述'}>
              <div dangerouslySetInnerHTML={ui_detail(goods_detail.text_detail)}></div>
            </DetailStaticWrap>
          </MountAnima>
          <MountAnima delay={200}>
            <DetailStaticWrap className={skeleton.detailWrap} title={'图文详情'}>
              {goods_detail.img_detail.map((detail, index) => {
                return <div key={index}>
                  <img src={detail.img} alt=""/>
                  <p>{detail.text}</p>
                </div>
              })}
            </DetailStaticWrap>
          </MountAnima>
        </div>
      </div>
      <BigBtn to={`/order/${goods_detail.goods_id}`}>立即购买</BigBtn>
    </div>;
  }
}
