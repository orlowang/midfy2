import * as React from 'react';
import {
  Link
} from 'react-router';
const styl = require('./style.styl');

class ImgListType {
  url: string;
  title: string;
  linkTo: string;
  isMarketing: boolean;
}

export interface BannerProps {
  className?: string;
  imgList: ImgListType[];
  autoPlay?: boolean;
  intervals?: number;
};

/**
 * Banner
 */
export class Banner extends React.Component<BannerProps, {}>{
  handleSwitch(){

  }
  render(){
    let _classname = this.props.className ? ' ' + this.props.className : '';
    let ui_imglist = this.props.imgList.length > 0 && this.props.imgList.map((img, index) => {
      return <Link className={styl.item} key={index} to={img.linkTo}>
        <img src={img.url} alt={img.title}/>
      </Link>;
    });
    return <div className={`${styl.banner}${_classname} banner`}>
      <div className={styl.imgListContainer}>{ui_imglist}</div>
      <div className={styl.status}></div>
    </div>; 
  }
}