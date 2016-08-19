import * as React from 'react';
import * as Relay from "react-relay";
const skeleton = require('../assets/css/skeleton.styl');
import { Link } from 'react-router';
import {
  GoodsItemFlat
} from '../../vender.src/components/MallComp';
import {
  MountAnimaShow
} from '../../vender.src/components/Animate';

export interface MallProps {};

class Mall extends React.Component<MallProps, {}>{


  render(){
    let ui_good_list = this.props.viewer.goodsList.map((goods, index) => {
      let data = {
        goodsImage: goods.mainPhoto,
        goodsPrice: goods.Price,
        goodsSubTitle: goods.subTitle,
        hasSold: goods.hasSold,
        inStock: goods.inStock,
        tags: goods.Tags,
      };
      return <Link key={index} to={`/detail/${goods.Id}`}>
        <GoodsItemFlat imagePosition={index%2 ? 'down' : 'up'} className={skeleton.goodsItemFlat} goodsInfo={data}>
          {goods.Name}
        </GoodsItemFlat>
      </Link>;
    });
    return <MountAnimaShow>
      <div className={`${skeleton.root} fmroot`}>
        <div className={skeleton.banner}></div>
        <div className={`${skeleton.goodsList}`}>{ui_good_list}</div>
      </div>
    </MountAnimaShow>;
  }
}

export default Relay.createContainer(Mall, {
  fragments: {
    viewer: () => Relay.QL`
      fragments on Viewer {
        goodsList {
          Id,
          Name,
          subTitle,
          mainPhoto,
          Price,
          Tags {
            Id,
            Name
          },
        }
      }
    `
  }
})
