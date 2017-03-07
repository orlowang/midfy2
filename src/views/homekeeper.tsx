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
  getByREST,
  syncCallNative
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
      keepertmp: localStorage.getItem('keeper') ? JSON.parse(localStorage.getItem('keeper'))['id'] : null
    };
  };

  componentWillMount(){
    document.body.style.backgroundColor = skeleton.mainBgColor;
  }

  componentDidMount(){
    let that = this;
    syncCallNative({
      handle: "initWithBlackpearl",
      query: {
        Mobile_ShowShareButton: "No",
        Mobile_ConfigTitle: "选择管家"
      }
    })
    getByREST(`keeper/list?`, (data) => {
      that.setState({
        keeper: data.result,
        keepertmp: (() => {
          let _keep = data.result;
          if (localStorage.getItem('keeper')) {
            return JSON.parse(localStorage.getItem('keeper'))['id']
          } else {
            for(let i=0; i < _keep.length; i++){
              if (_keep[i].selected){
                return _keep[i].id
              }
            }
          }
          
        })()
      })
    });
  }

  selectKeeper(id) {
    let selected = {};
    console.log(id)
    if (id){
      this.setState({
        keepertmp: id
      })

      if (id == 100) {
        selected = {
          id: 100,
          fullname: '不清楚管家是谁',
          mobile: null,
          grid_code: null,
          grid_name: null,
        }
      } else {
        let keeper = this.state.keeper;
        for(let i = 0; i < keeper.length; i++){
          if(keeper[i].id == id) {
            selected = keeper[i];
          }
        }
      }

      localStorage.setItem('keeper', JSON.stringify(selected));
    }
  }

  saveUserInfo(){
    if(!localStorage.getItem('keeper')){
      alert('请选择管家')
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
    console.log(this.state.keepertmp);
    
    return <div className={`${skeleton.address} HomeKeeper`}>
      <div className={`${skeleton.root} ${navigator.userAgent.indexOf('VKStaffAssistant') >= 0 && skeleton.hastitlebar}`}>
        <div className={skeleton.rootwrap}>
          <MountAnima>
            <p className={skeleton.titlep}>请选择收获地址所属管家</p>
            <div className={skeleton.itemList}>
              {this.state.keeper.map(keeper => <ItemIOS className={'selection'} title={keeper.fullname}
                click={this.selectKeeper.bind(this, keeper.id)}>
                <div className={`${skeleton.selecti} ${(this.state.keepertmp && this.state.keepertmp == keeper.id) && skeleton.on}`}>√</div>
              </ItemIOS>)}
              <ItemIOS click={this.selectKeeper.bind(this, 100)} className={'selection'} title="不清楚管家是谁">
                <div className={`${skeleton.selecti} ${(this.state.keepertmp && this.state.keepertmp == 100) && skeleton.on}`}>√</div>
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
