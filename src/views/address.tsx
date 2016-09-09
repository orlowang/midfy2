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
import {
  TextInputNormal
} from "../../vender.src/components/TextComp";
import {
  userInfoType
} from '../helper/Types';

import {
  getByREST
} from '../helper/Fetch';
const skeleton = require('../assets/css/skeleton.styl');

interface AddressState {
  user?: userInfoType;
  usertmp?: string;
}

interface AddressProps extends Props<Address>{
  orderId: string;
  params: string;
};

export default class Address extends React.Component<AddressProps, AddressState>{
  constructor(props){
    super(props);
    this.state = {
      user: {
        name: null,
        nickname: null,
        sex: null,
        mobile: null,
        province: null,
        city: null,
        district: null,
        road: null,
        project_name: null,
        building_name: null,
        address: null,
      },
      usertmp: ':'
    };
  };

  refs : {
    [key: string]: (Element);
    roomId: (HTMLInputElement);
    user: (HTMLInputElement);
  }

  componentWillMount(){
    document.body.style.backgroundColor = skeleton.mainBgColor;
  }

  componentDidMount(){
    let that = this;
    getByREST(`addr/detail`, (data) => {
      that.setState({
        user: data.result
      }, () => {
        const username = this.badCodeSetName();
        !localStorage['usertmp'] && localStorage.setItem('usertmp', `${username}:${this.state.user.building_name}`)
        that.setState({
          usertmp: localStorage.getItem('usertmp')
        })
      })
    });
  }

  badCodeSetName(){
    let user = this.state.user;
    return user.name ? (user.sex == 2 ? `${user.nickname}女士` : `${user.nickname}先生`) : user.nickname;
  }

  saveUserInfo(){
    let session = JSON.parse(localStorage[`order-${this.props.params.orderId}`]);
    let badCodeUserSession = localStorage['usertmp'].split(":");
    session["consignee"] = badCodeUserSession[0];
    session["address"] = `${this.state.user.province}${this.state.user.city}${this.state.user.district}${this.state.user.road}${this.state.user.project_name}${badCodeUserSession[1]}`;
    localStorage.setItem(`order-${this.props.params.orderId}`, JSON.stringify(session));
    hashHistory.push(`/order/${this.props.params.orderId}`)
  }

  getInputValue(component, value){
    if(localStorage.getItem('usertmp')){
      let session = localStorage.getItem('usertmp').split(":");
      let newSession = `${component == 'consignee' ? value : session[0]}:${component == 'address' ? value : session[1]}`;
      localStorage.setItem(`usertmp`, newSession);
    }
  }

  render(){
    return <div className={`${skeleton.address} address`}>
      <div className={skeleton.root}>
        <div className={skeleton.rootwrap}>
          <MountAnima>
            <div className={skeleton.itemList}>
              <ItemIOS title="收货人">
                <TextInputNormal className={skeleton.textInput} name="consignee" complete={this.getInputValue.bind(this)} default={this.state.usertmp.split(":")[0]}></TextInputNormal>
              </ItemIOS>
              <ItemIOS title="联系电话">
                <span>{this.state.user.mobile}</span>
              </ItemIOS>
              <ItemIOS title="省市">
                <span>{this.state.user.province}</span>
              </ItemIOS>
              <ItemIOS title="社区">
                <span>{this.state.user.project_name}</span>
              </ItemIOS>
            </div>
            <p>如当前房屋地址有误，请修改房号信息，以便收货</p>
            <div className={skeleton.itemList}>
              <ItemIOS title="门牌号">
                <TextInputNormal className={skeleton.textInput} name="address" complete={this.getInputValue.bind(this)} default={this.state.usertmp.split(":")[1]}></TextInputNormal>
              </ItemIOS>
            </div>
          </MountAnima>
        </div>
      </div>
      <BigBtn even={this.saveUserInfo.bind(this)}>提交</BigBtn>
    </div>;
  }
}
