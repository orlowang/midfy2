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
  Layer
} from '../../vender.src/components/NoticeComp';
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
  data?: goodsListType[];
  categorys?: Object[];
  cateState?: number;
  layerState?: string;
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
      data: [],
      categorys: [],
      cateState: 0,
      layerState: null
    };
  };
  componentWillMount(){
    document.body.style.backgroundColor = skeleton.sipcBgColor;
    document.title = "商品列表";
    //解决IOS下title不生效问题
    const mobile = navigator.userAgent.toLowerCase();
    const length = document.querySelectorAll('iframe').length;
    if (/iphone|ipad|ipod/.test(mobile) && !length) {
      const iframe = document.createElement('iframe');
      iframe.style.cssText = 'display: none; width: 0; height: 0;';
      iframe.setAttribute('src', 'about:blank');
      iframe.addEventListener('load', () => {
        setTimeout(() => {
          iframe.removeEventListener('load', false);
          document.body.removeChild(iframe);
        }, 0);
      });
      document.body.appendChild(iframe);
    }
  }

  componentDidMount(){
    let that = this;
    getByREST('category/list', (data) => {
      that.setState({
        categorys: data.result
      }, () => {
        getByREST(`goods/list?cat=${this.state.categorys[0].categoryId}`, (data) => {
          that.setState({
            data: data.result
          })
        });
      })
    });
    this.checkAppVersion()
    // this.refs.scrollbody.addEventListener('scroll', () => {
    //   let n = 0
    //   let bodyheight = document.body.scrollHeight;
    //   let documentheight = this.refs.scrollbody.scrollHeight;
    //   let documenttop = this.refs.scrollbody.scrollTop

    //   if(documenttop >= (documentheight - bodyheight)*2/3){
    //     n++;
    //     getByREST(`goods/list?cat=${this.state.categorys[0].categoryId}&page=${n}`, (data) => {
    //       that.setState({
    //         data: data.result
    //       })
    //     });
    //   }
    // })
  }

  isVersionOutdate(current, standard){
    let cargs = current.split('.');
    let sargs = standard.split('.');
    for(let i = 0; i < sargs.length; i++){
      if (parseInt(sargs[i]) > parseInt(cargs[i])) {
        return true
      }
    }
  }

  checkAppVersion(){
    let app_env = window.appEnvironment;
    let current_version_android = '3.0.10';
    let current_version_ios = '3.1.0';
    let check = window.setInterval(()=>{
      if (app_env) {
        let standard_version, out_going;
        if (app_env.platform != 'Android') {
          standard_version = current_version_ios;
          out_going = () => {
            location.href = 'itms-apps://itunes.apple.com/us/app/zhu-zhe-er-ye-zhu-bi-bei/id732660211?ls=1&mt=8';
          }
        } else {
          standard_version = current_version_android;
          out_going = () => {
            // var nativeBridge = {
            //     invoke: function (commandName, args) {
            //         console.log(commandName + ": " + JSON.stringify(args, null, 2));
                    
            //     window.location = 'js-call:' + commandName + ':' + encodeURIComponent(JSON.stringify(args));
            //     }
            // };
            // //如果是原生直接有的方法
            // if (window.imageListener) {
            //     imageListener.updateApp();
            // } else {
            // //如果是web通过与原生的连接桥,来调用原生暴露的接口
            //   nativeBridge.invoke('updateApp');
            // }
            location.href = 'http://img.4009515151.com/release/zhuzher-vanke-release-3.1.0.apk';
          };
        }
        if (this.isVersionOutdate(app_env.appVersion, standard_version)) {
          let timer = setTimeout(() => {
            this.setState({
              layerState: out_going
            }, () => {
              clearTimeout(timer);
              clearInterval(check)
            })
          }, 100)
        }
      } else {
        clearInterval(check)
      }
    }, 200);
  }

  setCategory(cid, index){
    let that = this;
    getByREST(`goods/list?cat=${cid}`, (data) => {
      that.setState({
        cateState: index,
        data: data.result
      })
    });
  }

  render(){
    let app_env = window.appEnvironment;
    let ui_good_list = this.state.data.map((goods, index) => {
      let data = {
        goodsImage: goods.img,
        goodsPrice: goods.min_price,
        goodsSubTitle: goods.title,
        hasSold: null,
        inStock: null,
        tags: [{
          Key: goods.sunshine_community,
          Value: goods.sunshine_community && <img src={require(`../assets/img/sun_icon.svg`)} alt=""/>
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
      <div ref="scrollbody" className={`${skeleton.root} ${skeleton.scrollwrap} fmroot`}>
        <div className={skeleton.banner}>
          <img src={require('../assets/img/store_banner.png')} alt=""/>
        </div>
        <div className={`${skeleton.goodsList}`}>
          {ui_good_list}
        </div>
      </div>
      <div className={skeleton.bars}>
        {this.state.categorys.map((category, index) => index <= 3 && <div className={this.state.cateState == index ? skeleton.on : ''} onClick={this.setCategory.bind(this, category.categoryId, index)} key={category.categoryId}>{category.name}</div>)}
      </div>
      <div>
        {this.state.layerState && <MountAnimaShow><Layer confirm={{text: `${app_env.platform != 'Android' ? '升级到V3.1.0 版 >>' : '下载v 3.1.0'}`, func: this.state.layerState}}>
          <img src={require('../assets/img/banben.svg')} alt=""/>
          {app_env.platform != 'Android' ? <p>友邻市集搭配“住这儿” v3.1.0 版本共同登场，快快升级，携手邻居一同加入社区友邻计划！</p> : <p>友邻市集搭配“住这儿” v3.1.0 版本共同登场，快快升级，携手邻居一同加入社区友邻计划！请在各应用市场下载更新，或点击下方直接下载新版本</p>}
        </Layer></MountAnimaShow>}
      </div>
    </MountAnimaShow>;
  }
}
