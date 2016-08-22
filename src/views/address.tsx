import * as React from 'react';
import * as Relay from "react-relay";
import {
  MountAnima
} from '../../vender.src/components/Animate';
import {
  ItemIOS
} from '../../vender.src/components/ItemIOSComp';
import {
  BigBtn
} from "../../vender.src/components/MallComp";
const skeleton = require('../assets/css/skeleton.styl');

export interface AddressProps {};

class Address extends React.Component<AddressProps, {}>{

  componentDidMount(){

  }

  render(){
    return <div className={`${skeleton.address} address`}>
      <div className={skeleton.root}>
        <div className={skeleton.rootwrap}>
          <MountAnima>
            <div className={skeleton.itemList}>
              <ItemIOS title="收货人">
                <span>￥12.00</span>
                <span>0.00</span>
              </ItemIOS>
              <ItemIOS title="联系电话">
                <span>￥12.00</span>
                <span>0.00</span>
              </ItemIOS>
              <ItemIOS title="省市">
                <span>￥12.00</span>
                <span>0.00</span>
              </ItemIOS>
              <ItemIOS title="社区">
                <span>￥12.00</span>
                <span>0.00</span>
              </ItemIOS>
            </div>
            <p>如当前房屋地址有误，请修改房号信息，以便收货</p>
            <div className={skeleton.itemList}>
              <ItemIOS title="收货人">
                <span>￥12.00</span>
                <span>0.00</span>
              </ItemIOS>
            </div>
          </MountAnima>
        </div>
      </div>
      <BigBtn to={``}>提交</BigBtn>
    </div>;
  }
}

export default Relay.createContainer(Address, {
  initialVariables: {
    goodsid: null
  },
  fragments: {
    viewer: () => Relay.QL`
      fragments on Viewer {
        Goods(id: $goodsid){
          Id,
          Name,
          mainPhoto,
          Price,
          subTitle,
          inStock,
          SKU{
            Name,
            Key
          }
        }
      }
    `
  }
})
