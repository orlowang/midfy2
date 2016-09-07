import * as React from 'react';
import {
  Component,
  Props
} from 'react';
import * as Relay from 'react-relay';
const skeleton = require('../assets/css/skeleton.styl');
import { Link } from 'react-router';
import {
  GoodsItemFlat
} from '../../vender.src/components/MallComp';
import {
  MountAnimaShow
} from '../../vender.src/components/Animate';

interface MallProps extends Props<Mall>{
  viewer: {
    goodsList: any;
  }
};

class Mall extends Component<MallProps, {}>{
  componentWillMount(){
    document.body.style.backgroundColor = skeleton.sipcBgColor;
  }

  render(){
    let ui_good_list = this.props.viewer.goodsList.map((goods, index) => {
      goods.Tags.map((tag) => {
        tag.Value = tag.Value ? <img src={require(`../assets/img/sun_icon.svg`)} alt=""/> : ''
      })
      let data = {
        goodsImage: goods.mainPhoto,
        goodsPrice: goods.Price,
        goodsSubTitle: goods.subTitle,
        hasSold: goods.hasSold,
        inStock: goods.inStock,
        tags: goods.Tags,
      };
      return <Link key={index} to={`/detail/${goods.Id}`}>
        <GoodsItemFlat isButton={true} imagePosition={index%2 ? 'down' : 'up'} className={skeleton.goodsItemFlat} goodsInfo={data}>
          {goods.Name}
          <div className={`${skeleton.keyprop}${index%2 ? ` ${skeleton.down}` : ` ${skeleton.up}`}`}>
            <img src={require('../assets/img/bg1.svg')} alt=""/>
            <img src={require('../assets/img/bg2.svg')} alt=""/>
          </div>
        </GoodsItemFlat>
      </Link>;
    });
    return <MountAnimaShow>
      <div className={`${skeleton.root} ${skeleton.scrollwrap} fmroot`}>
        <div className={skeleton.banner}>
          <img src={require('../assets/img/store_banner.png')} alt=""/>
        </div>
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
            Key,
            Value
          },
        }
      }
    `
  }
})
