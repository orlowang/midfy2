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
  cateState?: Object;
  layerState?: Function;
  fkad?: Object[];
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
      fkad: {
        project_name: null,
        project_sum: '-',
        ranking: '-'
      },
      cateState: {
        id: null,
        index: 0,
        page: 0,
        isLast: false
      },
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
        getByREST(`goods/list?cat=${this.state.categorys[0].categoryId}&page=0&per_page=10`, (data) => {
          that.setState({
            data: data.result
          }, () => {
            localStorage.setItem('page', `${this.state.categorys[0].categoryId}:0`);
            this.refs.scrollbody.addEventListener('scroll', () => {
              let page = localStorage.getItem('page').split(':');
              let bodyheight = document.body.scrollHeight;
              let documentheight = this.refs.scrollbody.scrollHeight;
              let documenttop = this.refs.scrollbody.scrollTop;
              let dpr = window.devicePixelRatio;
              if(documenttop >= parseInt(documentheight - bodyheight + dpr * 12 * 3.33333)){
                !this.state.cateState.isLast ? localStorage.setItem('page', `${page[0]}:${parseInt(page[1])+1}`) : localStorage.setItem('page', `${page[0]}:${parseInt(page[1])}`);
                let newPage = localStorage.getItem('page').split(':');
                console.log(this.state.cateState.isLast)
                getByREST(`goods/list?cat=${newPage[0]}&page=${newPage[1]}&per_page=10`, (data) => {
                  if (data.result.length >= 1) {
                    console.log(data.result.length)
                    that.setState({
                      data: this.state.data.concat(data.result)
                    })
                  } else {
                    this.state.cateState.isLast = true;
                    // localStorage.setItem('page', `${page[0]}:${parseInt(page[1])-1}`);
                  }
                });
              }
            })
          })
        });
      })
    });
    getByREST('statistics/sunshine/ranking', (data) => {
      that.setState({
        fkad: data.result
      })
    })
    this.checkAppVersion()
  }

  componentWillUnmount(){
    localStorage.setItem('page', '0:0')
  }

  isVersionOutdate(current, standard){
    let cargs = current.split('.');
    let sargs = standard.split('.');
    for(let i = 0; i < sargs.length; i++){
      if (parseInt(sargs[i]) > parseInt(cargs[i])) {
        return true
      } else if(parseInt(sargs[i]) < parseInt(cargs[i])){
        return false
      }
    }
  }

  checkAppVersion(){
    let current_version_android = '3.0.10';
    let current_version_ios = '3.1.0';
    const mobile = navigator.userAgent.toLowerCase();
    let check = window.setInterval(()=>{
      let app_env = window.appEnvironment;
      if (app_env) {
        let standard_version, out_going;
        if (/iphone|ipad|ipod/.test(mobile)) {
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
            location.href = 'http://api.local/native_service?data={"method":"closeWeb"}';
          };
        }
        console.log(this.isVersionOutdate(app_env.appVersion, standard_version))
        if (this.isVersionOutdate(app_env.appVersion, standard_version)) {
          let timer = setTimeout(() => {
            this.setState({
              layerState: out_going
            }, () => {
              clearTimeout(timer)
            })
          }, 100)
        }
        clearInterval(check)
      } else {
        console.log('here')
        const mobile = navigator.userAgent.toLowerCase();
        let goto;
        if (/iphone|ipad|ipod/.test(mobile)) {
          goto = 'itms-apps://itunes.apple.com/us/app/zhu-zhe-er-ye-zhu-bi-bei/id732660211?ls=1&mt=8'
        } else {
          goto = 'http://api.local/native_service?data={"method":"closeWeb"}'
        }
        let timer = setTimeout(() => {
          this.setState({
            layerState: ()=>{this.setState({
              layerState: false
            })}
          }, () => {
            clearTimeout(timer);
            clearInterval(check)
          })
        }, 100)
      }
    }, 200);
  }

  setCategory(cid, index){
    let that = this;
    getByREST(`goods/list?cat=${cid}&page=0&per_page=10`, (data) => {
      localStorage.setItem('page', `${cid}:0`);
      that.setState({
        cateState: {
          id: cid,
          index: index,
          page: 0,
          isLast: false
        },
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
          Key: false // goods.sunshine_community,
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
        <a style={{textDecoration: 'none'}} href="http://blackpearl.4009515151.com/login?request_uri=http%3a%2f%2fblackpearl.4009515151.com%2fassets%2fh5%2fylplan.html">
          <div className={skeleton.topcard}>
            <div>
              <div>
                <span>{this.state.fkad.project_name}已募集(元)</span>
                <p>{this.state.fkad.project_sum}</p>
              </div>
              <div>
                <span>全国社区排名</span>
                <p>{this.state.fkad.ranking}</p>
              </div>
            </div>
            <span>为社区加油，争当NO.1 我也来搭把手 ></span>
          </div>
        </a>
        <div className={`${skeleton.goodsList}`}>
          {ui_good_list}
        </div>
      </div>
      <div className={skeleton.bars}>
        {this.state.categorys.map((category, index) => index <= 3 && <div className={this.state.cateState.index == index ? skeleton.on : ''} onClick={this.setCategory.bind(this, category.categoryId, index)} key={category.categoryId}>{category.name}</div>)}
      </div>
      <div>
        {this.state.layerState && <MountAnimaShow><Layer confirm={{text: `${(/iphone|ipad|ipod/).test(navigator.userAgent.toLowerCase()) ? '升级到V3.1.0 版 >>' : '知道了'}`, func: this.state.layerState}}>
          <img src={require('../assets/img/banben.svg')} alt=""/>
          {(/iphone|ipad|ipod/).test(navigator.userAgent.toLowerCase()) ? <p>友邻市集搭配“住这儿” v3.1.0 版本共同登场，快快升级，携手邻居一同加入社区友邻计划！</p> : <p>友邻市集搭配“住这儿” v3.1.0 版本共同登场，快快升级，携手邻居一同加入社区友邻计划！请在各应用市场下载更新</p>}
        </Layer></MountAnimaShow>}
      </div>
    </MountAnimaShow>;
  }
}
