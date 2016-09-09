import * as React from 'react';
import {
  Component,
  Props
} from 'react';
const skeleton = require('../assets/css/skeleton.styl');
import { Link } from 'react-router';
import {
  GoodsItemFlat
} from '../../vender.src/components/MallComp';
import {
  MountAnima,
  MountAnimaShow
} from '../../vender.src/components/Animate';
import {
  getByREST
} from '../helper/Fetch';
import 'whatwg-fetch';

interface goodsListType {
  goods_id: string;
  img: string;
  name: string;
  title: string;
  min_price: string;
  sunshine_community: string;
}

interface MallState {
  data: goodsListType[];
}

interface MallProps extends Props<Mall>{
  viewer: {
    goodsList: any;
  }
};

export default class Mall extends Component<MallProps, MallState>{
  constructor(props){
    super(props);
    this.state = {
      data: []
    };
  };
  componentWillMount(){
    document.body.style.backgroundColor = skeleton.sipcBgColor;
  }

  componentDidMount(){
    let that = this;
    getByREST('goods/list', (data) => {
      that.setState({
        data: data.result
      })
    });
  }

  render(){
    let ui_good_list = this.state.data.map((goods, index) => {
      let data = {
        goodsImage: goods.img,
        goodsPrice: goods.min_price,
        goodsSubTitle: goods.title,
        hasSold: null,
        inStock: null,
        tags: [{
          Key: true,
          Value: <img src={require(`../assets/img/sun_icon.svg`)} alt=""/>
        }],
      };
      return <Link key={index} to={`/detail/${goods.goods_id}`}>
        <GoodsItemFlat isButton={true} imagePosition={index%2 ? 'down' : 'up'} className={skeleton.goodsItemFlat} goodsInfo={data}>
          {goods.name}
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
        <div className={`${skeleton.goodsList}`}>
          {ui_good_list}
        </div>
      </div>
    </MountAnimaShow>;
  }
}
