import * as React from 'react';
import * as Relay from "react-relay";
import { Link } from 'react-router';
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
  GoodsItemFlat,
  DetailStaticWrap,
  GoodsSKUSimple,
  BigBtn
} from "../../vender.src/components/MallComp";
import {
  ItemIOS
} from '../../vender.src/components/ItemIOSComp';
const skeleton = require('../assets/css/skeleton.styl');

const mock_detail = `<div>sfsfssfsfs<br/>sfsfssfsfs<br/>sfsfssfsfs<br/>sfsfssfsfs<br/>sfsfssfsfs<br/>sfsfssfsfs<br/>sfsfssfsfs<br/>sfsfssfsfs<br/>sfsfssfsfs<br/>sfsfssfsfs<br/>sfsfssfsfs<br/>sfsfssfsfs<br/>sfsfssfsfs<br/>sfsfssfsfs<br/>sfsfssfsfs<br/>sfsfssfsfs<br/>sfsfssfsfs<br/>sfsfssfsfs<br/>sfsfssfsfs<br/>sfsfssfsfs<br/>sfsfssfsfs<br/></div>`;

export interface DetailProps {};

class Detail extends React.Component<DetailProps, {}>{

  componentWillMount(){
    
  }

  componentDidMount(){
    let goods_detail = this.props.viewer.Goods;
    let orderSessionID = `order-${goods_detail.Id}`;
    if (!localStorage[orderSessionID]) {
      let data = {}, data_string;
      goods_detail.SKU.map((sku) => {
        data[sku.Name] = ''
      })
      localStorage.setItem(orderSessionID, JSON.stringify(data))
    }
  }

  render(){
    let goods_detail = this.props.viewer.Goods;
    let ui_detail = (page) => {
      return {
        __html: page
      }
    };
    let data_goods_info = {
      goodsImage: null,
      goodsPrice: goods_detail.Price,
      goodsSubTitle: goods_detail.subTitle,
      tags: goods_detail.Tags
    };
    return <div className={`${skeleton.info} info`}>
      <div className={skeleton.root}>
        <div className={skeleton.rootwrap}>
          <MountAnimaShow>
            <Banner className={skeleton.banner} imgList={[]}></Banner>
            <GoodsItemFlat className={skeleton.goodsInfoFlat} goodsInfo={data_goods_info} imagePosition="up">
              {goods_detail.Name}
            </GoodsItemFlat>
          </MountAnimaShow>
          <MountAnima>
            <DetailStaticWrap title={'产品描述'}>
              <div dangerouslySetInnerHTML={ui_detail('safafasfsasfasfasfsafsfsafsfsfsfsfsaf')}></div>
            </DetailStaticWrap>
          </MountAnima>
          <MountAnima delay={200}>
            <DetailStaticWrap title={'图文详情'}>
              <div dangerouslySetInnerHTML={ui_detail('safafasfsasfasfasfsafsfsafsfsfsfsfsaf')}></div>
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
          Price,
          subTitle,
          Tags{
            Id,
            Name
          },
          SKU{
            Name,
            Key
          }
        }
      }
    `
  }
})
