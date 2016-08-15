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
  GoodsItemSimple,
  GoodsKUASimple,
  BigBtn
} from "../../vender.src/components/MallComp";
import {
  ItemIOS
} from '../../vender.src/components/ItemIOSComp';
const skeleton = require('../assets/css/skeleton.styl');

const mock_detail = `<div>sfsfssfsfs<br/>sfsfssfsfs<br/>sfsfssfsfs<br/>sfsfssfsfs<br/>sfsfssfsfs<br/>sfsfssfsfs<br/>sfsfssfsfs<br/>sfsfssfsfs<br/>sfsfssfsfs<br/>sfsfssfsfs<br/>sfsfssfsfs<br/>sfsfssfsfs<br/>sfsfssfsfs<br/>sfsfssfsfs<br/>sfsfssfsfs<br/>sfsfssfsfs<br/>sfsfssfsfs<br/>sfsfssfsfs<br/>sfsfssfsfs<br/>sfsfssfsfs<br/>sfsfssfsfs<br/></div>`;

class DetailStatus {
  session: string;
}

export interface DetailProps {};

class Detail extends React.Component<DetailProps, DetailStatus>{
  constructor(props){
    super(props);
    this.state = {
      session: localStorage[`order-${this.props.goodsDetail.id}`]
    };
  };

  componentDidMount(){
    if (!this.state.session) {
      let data = {}, data_string;
      this.props.goodsDetail.kuas.map((kua) => {
        data[kua] = ''
      })
      localStorage.setItem(`order-${this.props.goodsDetail.id}`, JSON.stringify({"d":12}))
      this.setState({
        session: `order-${this.props.goodsDetail.id}`
      })
    }
  }

  render(){
    console.log(JSON.parse(localStorage.getItem(`order-${this.props.goodsDetail.id}`)))
    console.log(this.state)
    console.log(this.props.goodsDetail)
    let ui_kuas = this.props.goodsDetail.kuas.map((kua, index) => {
      return <GoodsKUASimple className={`${skeleton.goodskua}`} key={index} kuas={kua.key}>
        {kua.name}
      </GoodsKUASimple>;
    });
    let ui_detail = (page) => {
      return {
        __html: page
      }
    };
    return <div className={`${skeleton.info} info`}>
      <div className={skeleton.root}>
        <div>
          <MountAnimaShow>
            <Banner className={skeleton.banner} imgList={[]}></Banner>
          </MountAnimaShow>
          <MountAnima>
            <div className={`${skeleton.detail} detail`}>
              <GoodsItemSimple goodsPrice={this.props.goodsDetail.price} goodsSign={0}>
                {this.props.goodsDetail.name}
              </GoodsItemSimple>
            </div>
            {ui_kuas}
            <ItemIOS className={skeleton.fare} title="运费">
              <span>￥12.00</span>
              <span>0.00</span>
            </ItemIOS>
            <div className={`${skeleton.goodsinfo}`}>
              <div dangerouslySetInnerHTML={ui_detail(mock_detail)}></div>
            </div>
          </MountAnima>
        </div>
      </div>
      <BigBtn to={`/order/${this.props.goodsDetail.id}`}>立即购买</BigBtn>
    </div>;
  }
}

export default Relay.createContainer(Detail, {
  fragments: {
    goodsDetail: () => Relay.QL`
      fragments on GoodsDetail {
        id,
        name,
        price,
        hasSold,
        kuas{
          name,
          key
        }
      }
    `
  }
})
