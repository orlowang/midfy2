import * as React from 'react';
import {
  Component,
  Props
} from 'react';
import * as Relay from "react-relay";
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
const skeleton = require('../assets/css/skeleton.styl');

interface DetailProps extends Props<Detail>{
  viewer: {
    Goods: any;
  }
};

class Detail extends React.Component<DetailProps, {}>{

  componentWillMount(){
    document.body.style.backgroundColor = skeleton.mainBgColor;
  }

  componentDidMount(){
    
  }

  render(){
    let goods_detail = this.props.viewer.Goods, goods_photos = [];
    let ui_detail = (page) => {
      return {
        __html: page
      }
    };
    goods_detail.Tags.map((tag) => {
      tag.Value = <img src={require(`../assets/img/sun_icon.svg`)} alt=""/>
    })
    let data_goods_info = {
      goodsImage: null,
      goodsPrice: `${goods_detail.minPrice} - ${goods_detail.maxPrice}`,
      goodsSubTitle: goods_detail.subTitle,
      tags: goods_detail.Tags
    };
    goods_detail.Photos.map((photo) => {
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
              {goods_detail.Name}
            </GoodsItemFlat>
          </MountAnimaShow>
          <MountAnima>
            <DetailStaticWrap title={'产品描述'}>
              <div dangerouslySetInnerHTML={ui_detail(goods_detail.Detail)}></div>
            </DetailStaticWrap>
          </MountAnima>
          <MountAnima delay={200}>
            <DetailStaticWrap className={skeleton.detailWrap} title={'图文详情'}>
              {goods_detail.imgDetail.map((detail, index) => {
                return <div key={index}>
                  <img src={detail.Value} alt=""/>
                  <p>{detail.Key}</p>
                </div>
              })}
            </DetailStaticWrap>
          </MountAnima>
        </div>
      </div>
      <BigBtn to={`/order/${goods_detail.Id}`}>立即购买</BigBtn>
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
          Photos,
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
          Tags{
            Key,
            Value
          },
          SKU{
            Name,
            Key{
              Key,
              Value
            }
          },
          Detail,
          imgDetail{
            Key,
            Value
          },
          Shiping
        }
      }
    `
  }
})
