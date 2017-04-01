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
import isOldVersion from '../helper/version';
import {
  getByREST,
  syncCallNative
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
console.log(skeleton)
interface MallProps extends Props<Mall>{
  viewer: {
    goodsList: any;
  }
};

export default class Mall extends Component<MallProps, MallState>{
  constructor(props){
    super(props);
    // 解决ios列表重复加载问题
    this.AJAX_LOCK = false;
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
      layerState: null,
      titlePos: false,
      paddingBot: 0            
    };
  };
  componentWillMount(){
    document.body.style.backgroundColor = skeleton.sipcBgColor;
  }

  componentDidMount(){
    syncCallNative({
      handle: "initWithBlackpearl",
      query: {
        Mobile_ShowShareButton: "No",
        Mobile_ConfigTitle: "友邻市集"
      }
    })
    localStorage.removeItem('keeper');
    let that = this;
    // 最开始时tab的位置
    let tabTop = that.refs.tab.offsetTop;
    console.log("第一次"+new Date().getTime());
    getByREST('category/list?', (data) => {
      that.setState({
        categorys: data.result
      }, () => {
        getByREST(`goods/list?cat=${this.state.categorys[0].categoryId}&page=0&per_page=10&`, (data) => {
	      console.log("渲染出来列表数据" +new Date().getTime())
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
              // 添加当滚到tab位置时tab悬浮置顶
              if(documenttop >= tabTop){
              	that.setState({
              		titlePos: true
              	})
              }else{
              	that.setState({
              		titlePos: false
              	})
              }
              if(documenttop >= parseInt(documentheight - bodyheight + dpr * 12 * 3.33333)){
                if (that.AJAX_LOCK) return 
                that.AJAX_LOCK = true
                !this.state.cateState.isLast ? localStorage.setItem('page', `${page[0]}:${parseInt(page[1])+1}`) : localStorage.setItem('page', `${page[0]}:${parseInt(page[1])}`);
                let newPage = localStorage.getItem('page').split(':');
                console.log(this.state.cateState.isLast)
                getByREST(`goods/list?cat=${newPage[0]}&page=${newPage[1]}&per_page=10&`, (data) => {
                  if (data.result.length >= 1) {
                    console.log(data.result.length)
                    that.setState({
                      data: this.state.data.concat(data.result)
                    })
                  } else {
                    this.state.cateState.isLast = true;
                    // localStorage.setItem('page', `${page[0]}:${parseInt(page[1])-1}`);
                  }
                  that.AJAX_LOCK = false
                });
              }
            })
          })
        });
      })
    });
    getByREST('statistics/sunshine/ranking?', (data) => {
      that.setState({
        fkad: data.result
      })
    })
    // this.checkAppVersion()
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
            // location.href = 'http://api.local/native_service?data={"method":"closeWeb"}';
            this.setState({
              layerState: false
            })
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
        const mobile = navigator.userAgent.toLowerCase();
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
    getByREST(`goods/list?cat=${cid}&page=0&per_page=10&`, (data) => {
      localStorage.setItem('page', `${cid}:0`);
      that.setState({
        cateState: {
          id: cid,
          index: index,
          page: 0,
          isLast: false
        },
        data: data.result
      },() => {
    	let tabTop = that.refs.tab.offsetTop;
    	let clientHeight = that.refs.scrollbody.scrollHeight;
    	let bodyheight = document.body.scrollHeight;
    	let dis= clientHeight - bodyheight;
        if(dis<tabTop){
        	that.setState({
        		paddingBot: tabTop - dis
        	})
        	that.refs.scrollbody.scrollTop= tabTop;
        }else{
        	
        }
      })
    });
  }

  render(){
    let app_env = window.appEnvironment;
    let ua = navigator.userAgent;
    
    let ui_good_list = this.state.data.map((goods, index) => {
      let data = {
        goodsImage: goods.img,
        goodsPrice: goods.min_price,
        goodsSubTitle: goods.title,
        hasSold: null,
        inStock: null,
        tags: [{
          Key: goods.sunshine_community //false,
          Value: goods.sunshine_community && <img src={require(`../assets/img/sun_icon.svg`)} alt=""/>
        }],
        flashSale: false,
        endTime: goods.end_time
      };
      return <Link key={index} to={`/detail/${goods.goods_id}/projcode/0`}>
        <GoodsItemFlat isButton={!data.flashSale} imagePosition={index%2 ? 'down' : 'up'} className={skeleton.goodsItemFlat} goodsInfo={data}>
          {goods.name}
          {data.flashSale && <img style={Object.assign({
            width: '4rem',
            position: 'absolute',
            top: '0.66667rem',
          }, index%2 ? {right: '0.66667rem'}:{left: '0.66667rem'})} src={require('../assets/img/flashsale.svg')} alt=""/>}
        </GoodsItemFlat>
      </Link>;
    });
    let paddingStyle= {
    	paddingBottom: this.state.paddingBot
    }
    // MountAnimaShow导致ios8.x，暂时禁用
    return <div>
      <div ref="scrollbody" className={`${skeleton.root} ${skeleton.scrollwrap} ${navigator.userAgent.indexOf('VKStaffAssistant') >= 0 && skeleton.hastitlebar} fmroot`}>
        <div className={skeleton.banner}>
          <img src={require('../assets/img/store_banner.png')} alt=""/>
        </div>
        <a style={{textDecoration: 'none'}} onClick={() => {
          if (isOldVersion) {
            location.href = `https://blackpearl.4009515151.com/assets/h5/ylplan.html`;
          } else {
            if (window["appEnvironment"]["Html_token"]) {
              if (/iPhone/.test(ua)) {
                location.href = './#/?native_service?data={"method": "neighborPlane"}';
              } else {
                let i = document.createElement("iframe");
                i.src = `${location.origin}/service/#/?native_service?data={"method": neighborPlane}`;
                i.style.width = "0";
                i.style.height = "0";
                document.body.appendChild(i);
              }
            } else {
              location.href = `https://blackpearl.4009515151.com/assets/h5/ylplan.html?projcode=${window["appEnvironment"]["Html_projectCode"]}`;
            }
          }
        }}>
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
        <div className={`${skeleton.bars}`} ref="tab">
        	{this.state.categorys.map((category, index) => index <= 3 && <div onClick={this.setCategory.bind(this, category.categoryId, index)} key={category.categoryId}>{category.name}<div className={this.state.cateState.index == index ? skeleton.on : ''}></div></div>)}
        </div>
        <div className={`${skeleton.bars} ${skeleton.fixTitle} ${this.state.titlePos ? '' : skeleton.hideTitle}`}>
        	{this.state.categorys.map((category, index) => index <= 3 && <div onClick={this.setCategory.bind(this, category.categoryId, index)} key={category.categoryId}>{category.name}<div className={this.state.cateState.index == index ? skeleton.on : ''}></div></div>)}
        </div>
        <div className={`${skeleton.goodsList}`} style= {paddingStyle}>
          {ui_good_list}
        </div>
      </div>
      {/*<div className={skeleton.bars}>
        {this.state.categorys.map((category, index) => index <= 3 && <div className={this.state.cateState.index == index ? skeleton.on : ''} onClick={this.setCategory.bind(this, category.categoryId, index)} key={category.categoryId}>{category.name}</div>)}
      </div>*/}
      <div>
        {this.state.layerState && <div><Layer confirm={{text: `我知道了`, func: this.state.layerState}}>
          <img src={require('../assets/img/banben.svg')} alt=""/>
          {(/iphone|ipad|ipod/).test(navigator.userAgent.toLowerCase()) ? <p>友邻市集的支付功能，需要更新至3.1.0以上版本，到AppStore升级：）</p> : <p>友邻市集的支付功能，需要更新至3.1.0以上版本，应用市场可升级：）</p>}
        </Layer></div>}
      </div>
      {navigator.userAgent.indexOf('VKStaffAssistant') >= 0 && <div className={skeleton.titlebar}>
        <div onClick={() => {history.go(-1)}}>返回</div>
        <div>友邻市集</div>
      </div>}
    </div>;
  }
}
