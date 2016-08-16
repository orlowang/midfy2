import * as React from 'react';
import * as Relay from "react-relay";
const skeleton = require('../assets/css/skeleton.styl');
import { Link } from 'react-router';
import {
  Banner
} from '../../vender.src/components/BannerComp';
import {
  GoodsItem
} from '../../vender.src/components/MallComp';
import {
  MountAnimaShow
} from '../../vender.src/components/Animate';

export interface MallProps {};

class Mall extends React.Component<MallProps, {}>{


  render(){
    let ui_good_list = this.props.viewer.goods.map((goods, index) => {
      let data = {
        goodsImage: goods.mainImg,
        goodsPrice: goods.price,
        hasSold: goods.hasSold,
        inStock: goods.inStock,
        tags: [],
      };
      return <Link key={index} to={`/detail/${goods.id}`}>
        <GoodsItem className={skeleton.goodsitem} goodsInfo={data}>
          {goods.name}
        </GoodsItem>
      </Link>;
    });
    
    return <MountAnimaShow>
      <div className={`${skeleton.root} fmroot`}>
        <Banner className={skeleton.banner} imgList={this.props.viewer.banner}></Banner>
        <div className={`${skeleton.goodsList}`}>{ui_good_list}</div>
      </div>
    </MountAnimaShow>;
  }
}

export default Relay.createContainer(Mall, {
  fragments: {
    viewer: () => Relay.QL`
      fragments on Viewer {
        goods {
          id,
          name,
          mainImg,
          price,
          hasSold,
          inStock
        },
        banner {
          url,
          title,
          linkTo,
          isMarketing
        }
      }
    `
  }
})
