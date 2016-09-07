import * as React from 'react';
import {
  Component,
  Props
} from 'react';
import { hashHistory } from 'react-router';
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

interface AddressProps extends Props<Address>{
  orderId: string;
  viewer: {
    userInfo: any;
  }
};

class Address extends React.Component<AddressProps, {}>{

  refs : {
    [key: string]: (Element);
    roomId: (HTMLInputElement)
  }

  componentWillMount(){
    document.body.style.backgroundColor = skeleton.mainBgColor;
  }

  componentDidMount(){

  }

  saveUserInfo(){
    console.log(this.props.orderId)
    let session = JSON.parse(localStorage[`order-${this.props.orderId}`]);
    console.log(session)
    session['address'] = `${this.props.viewer.userInfo.province}${this.props.viewer.userInfo.city}${this.props.viewer.userInfo.district}${this.props.viewer.userInfo.road}${this.props.viewer.userInfo.project_name}${this.refs.roomId.value}`;
    
    localStorage.setItem(`order-${this.props.orderId}`, JSON.stringify(session));
    hashHistory.push(`/order/${this.props.orderId}`)
  }

  render(){
    let ui_name;
    let first_name = this.props.viewer.userInfo.name;
    let sex = this.props.viewer.userInfo.sex;
    let session = JSON.parse(localStorage[`order-${this.props.orderId}`]);

    if (sex && first_name) {
      ui_name = sex == 2 ? `${first_name}女士` : `${first_name}先生`;
    }

    return <div className={`${skeleton.address} address`}>
      <div className={skeleton.root}>
        <div className={skeleton.rootwrap}>
          <MountAnima>
            <div className={skeleton.itemList}>
              <ItemIOS title="收货人">
                <input type="text" defaultValue={ui_name || this.props.viewer.userInfo.nickname}/>
              </ItemIOS>
              <ItemIOS title="联系电话">
                <span>{this.props.viewer.userInfo.mobile}</span>
              </ItemIOS>
              <ItemIOS title="省市">
                <span>{this.props.viewer.userInfo.province}</span>
              </ItemIOS>
              <ItemIOS title="社区">
                <span>{this.props.viewer.userInfo.project_name}</span>
              </ItemIOS>
            </div>
            <p>如当前房屋地址有误，请修改房号信息，以便收货</p>
            <div className={skeleton.itemList}>
              <ItemIOS title="门牌号">
                <input ref="roomId" type="text" defaultValue={this.props.viewer.userInfo.building_name}/>
              </ItemIOS>
            </div>
          </MountAnima>
        </div>
      </div>
      <BigBtn even={this.saveUserInfo.bind(this)}>提交</BigBtn>
    </div>;
  }
}

export default Relay.createContainer(Address, {
  fragments: {
    viewer: () => Relay.QL`
      fragments on Viewer {
        userInfo{
          name,
          sex,
          nickname,
          mobile,
          province,
          city,
          district,
          road,
          project_name,
          building_name,
          address,
        }
      }
    `
  }
})
