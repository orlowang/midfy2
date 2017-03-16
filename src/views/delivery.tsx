import * as React from 'react';
import {
  Component,
  Props
} from 'react';
import {
  getDelivery
} from '../helper/Fetch';
const skeleton = require('../assets/css/skeleton.styl');

interface DeliveryStatus {
  delivery: {
    msg?: string;
    logistic_code?: number;
    traces?: Object[];
  };
}

interface DeliveryProps extends Props<Delivery>{
  params: {
    name: string;
    id: string;
  };
};

export default class Delivery extends React.Component<DeliveryProps, DeliveryStatus>{
  constructor(props){
    super(props);
    this.state = {
      delivery: {
        logistic_code: null
      }
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
        document.title = '物流信息';
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
      document.title = '物流信息';
    }
  }

  componentDidMount(){
    let that = this;
    getDelivery(`shipper_code=${this.props.params.name}&logistic_code=${this.props.params.id}`, (data) => {
      that.setState({
        delivery: data
      })
    });
  }

  getDeliveryName(code){
    const list = new Map();
    list.set('ANE', '安能物流');
    list.set('AXD', '安信达快递');
    list.set('BFDF', '百福东方');
    list.set('BQXHM', '北青小红帽');
    list.set('CCES', 'CCES快递');
    list.set('CITY100', '城市100');
    list.set('COE', 'COE东方快递');
    list.set('CSCY', '长沙创一');
    list.set('DBL', '德邦');
    list.set('DHL', 'DHL');
    list.set('DSWL', 'D速物流');
    list.set('DTWL', '大田物流');
    list.set('EMS', 'EMS');
    list.set('FEDEX', 'FedEx联邦快递');
    list.set('FKD', '飞康达');
    list.set('GDEMS', '广东邮政');
    list.set('GSD', '共速达');
    list.set('GTO', '国通快递');
    list.set('GTSD', '高铁速递');
    list.set('HFWL', '汇丰物流');
    list.set('HHTT', '天天快递');
    list.set('HLWL', '恒路物流');
    list.set('HOAU', '天地华宇');
    list.set('hq568', '华强物流');
    list.set('HTKY', '百世汇通');
    list.set('HXLWL', '华夏龙物流');
    list.set('HYLSD', '好来运快递');
    list.set('JD', '京东快递');
    list.set('JJKY', '京广速递');
    list.set('JJKY', '佳吉快运');
    list.set('JTKD', '捷特快递');
    list.set('JXD', '急先达');
    list.set('JYKD', '晋越快递');
    list.set('JYM', '加运美');
    list.set('JYWL', '佳怡物流');
    list.set('LB', '龙邦快递');
    list.set('LHT', '联昊通速递');
    list.set('MDKD', '民航快递');
    list.set('MLWL', '明亮物流');
    list.set('NEDA', '能达速递');
    list.set('QCKD', '全晨快递');
    list.set('QFKD', '全峰快递');
    list.set('QRT', '全日通快递');
    list.set('SDWL', '上大物流');
    list.set('SF', '顺丰快递');
    list.set('SFWL', '盛丰物流');
    list.set('SHWL', '盛辉物流');
    list.set('ST', '速通物流');
    list.set('STO', '申通快递');
    list.set('SURE', '速尔快递');
    list.set('TSSTO', '唐±申通');
    list.set('UAPEX', '全一快递');
    list.set('UC', '优速快递');
    list.set('WJWL', '万家物流');
    list.set('WXWL', '万象物流');
    list.set('XBWL', '新邦物流');
    list.set('XFEX', '信丰快递');
    list.set('XYT', '希优特');
    list.set('YADEX', '源安达快递');
    list.set('YCWL', '远成物流');
    list.set('YD', '韵达快递');
    list.set('YFEX', '越丰物流');
    list.set('YFHEX', '原飞航物流');
    list.set('YFSD', '亚风快递');
    list.set('YTKD', '运通快递');
    list.set('YTO', '圆通速递');
    list.set('YZPY', '邮政平邮/小包');
    list.set('ZENY', '增益快递');
    list.set('ZHQKD', '汇强快递');
    list.set('ZJS', '宅急送');
    list.set('ZTE', '众通快递');
    list.set('ZTKY', '中铁快运');
    list.set('ZTO', '中通速递');
    list.set('ZTWL', '中铁物流');
    list.set('ZYWL', '中邮物流');
    list.set('SAWL', '圣安物流');
    return list.get(code);
  }

  render(){
    let maps = this.state.delivery.traces && this.state.delivery.traces.reverse().map((trace, index) => <li key={index}>
      <div className={skeleton.left}></div>
      <div className={skeleton.right}>
        <p>{trace.accept_station}</p>
        <span>{trace.accept_time}</span>
      </div>
    </li>);
    return <div className={`${skeleton.Delivery} Delivery`}>
      <div className={`${skeleton.root} ${navigator.userAgent.indexOf('VKStaffAssistant') >= 0 && skeleton.hastitlebar}`}>
        {!this.state.delivery.msg ? <div className={skeleton.rootwrap}>
          <div className={skeleton.title}>
            <table>
              <tbody>
                <tr>
                  <td>物流公司：</td>
                  <td>{this.getDeliveryName(this.state.delivery.shipper_code)}</td>
                </tr>
                <tr>
                  <td>运单编号：</td>
                  <td>{this.state.delivery.logistic_code}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={skeleton.list}>
            <ul>{maps}</ul>
          </div>
        </div> : <span>{this.state.delivery.msg}</span>}
      </div>
      {navigator.userAgent.indexOf('VKStaffAssistant') >= 0 && <div className={skeleton.titlebar}>
        <div onClick={() => {history.go(-1)}}>返回</div>
        <div>物流信息</div>
      </div>}
    </div>;
  }
}
