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

interface HomeKeeperState {
  keeper?: any;
  keepertmp?: any;
}

interface HomeKeeperProps extends Props<HomeKeeper>{
  orderId: string;
  params: {
    orderId: string
  };
};

export default class HomeKeeper extends React.Component<HomeKeeperProps, HomeKeeperState>{
  constructor(props){
    super(props);
    this.state = {
      keeper: [],
      keepertmp: []
    };
  };

  componentWillMount(){
    document.body.style.backgroundColor = skeleton.mainBgColor;
    //解决IOS下title不生效问题
    const mobile = navigator.userAgent.toLowerCase();
    const length = document.querySelectorAll('iframe').length;
    if (/iphone|ipad|ipod/.test(mobile) && !length) {
      setTimeout(function(){
        //利用iframe的onload事件刷新页面
        document.title = '收货地址';
        var iframe = document.createElement('iframe');
        iframe.style.visibility = 'hidden';
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        iframe.src = '/favicon.ico';
        iframe.onload = function () {
            setTimeout(function () {
                document.body.removeChild(iframe);
            }, 0);
        };
        document.body.appendChild(iframe);
      },0);
    } else {
      document.title = '收货地址';
    }
  }

  componentDidMount(){
    let that = this;
    
    getByREST(`keeper/list?`, (data) => {
      that.setState({
        keeper: data.result
      }, () => {
        let _keeper = [];
        this.state.keeper.map((keeper, index) => {
          _keeper[index] = {
            keeper_id: _keeper.id,
            keeper_fullname: _keeper.fullname,
            keeper_mobile: _keeper.mobile,
            keeper_grid_code: _keeper.grid_code,
            keeper_grid_name: _keeper.grid_name,
            user_select: false
          }
        })
        that.setState({
          keepertmp: _keeper
        })
      })
    }, {});
  }

  saveUserInfo(){
    if(localStorage.getItem('usertmp')){
      let session = localStorage.getItem('usertmp').split(":");
      if (!session[0]) {
        alert('收货人名称不能为空！')
        return
      }
      if(!session[1]) {
        alert('问牌号不能为空！')
        return
      }
    }
    hashHistory.push(`/order/${this.props.params.orderId}`)
  }

  getInputValue(component, value){
    if(localStorage.getItem('usertmp')){
      let session = localStorage.getItem('usertmp').split(":");
      let newSession = `${component == 'consignee' ? value : session[0]}:${component == 'HomeKeeper' ? value : session[1]}`;
      localStorage.setItem(`usertmp`, newSession);
    }
  }

  render(){
    return <div className={`${skeleton.address} HomeKeeper`}>
      <div className={`${skeleton.root} ${navigator.userAgent.indexOf('VKStaffAssistant') >= 0 && skeleton.hastitlebar}`}>
        <div className={skeleton.rootwrap}>
          <MountAnima>
            <p className={skeleton.titlep}>请选择收获地址所属管家</p>
            <div className={skeleton.itemList}>
              {this.state.keeper.map(keeper => <ItemIOS title={keeper.fullname}
                click={() => {}}>
                <div className={`${skeleton.selecti} ${skeleton.on}`}>√</div>
              </ItemIOS>)}
              <ItemIOS title="不清楚管家是谁">
                <div className={skeleton.selecti}>√</div>
              </ItemIOS>
            </div>
          </MountAnima>
        </div>
      </div>
      <BigBtn even={this.saveUserInfo.bind(this)}>提交</BigBtn>
      {navigator.userAgent.indexOf('VKStaffAssistant') >= 0 && <div className={skeleton.titlebar}>
        <div onClick={() => {history.go(-1)}}>返回</div>
        <div>选择管家</div>
      </div>}
    </div>;
  }
}
