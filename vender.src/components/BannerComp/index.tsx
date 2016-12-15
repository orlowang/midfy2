import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import {
  Link
} from 'react-router';
const styl = require('./style.styl');

interface SlideTouchStatus {
  index?: number;
}

interface ImgListType {
  url: string;
  title?: string;
  linkTo?: string;
  isMarketing?: boolean;
}

export interface SlideTouchProps {
  className?: string;
  imgList: ImgListType[];
  autoPlay?: boolean;
  intervals?: number;
  index?: number;
};

/**
 * SlideTouch
 */
export class SlideTouch extends React.Component<SlideTouchProps, SlideTouchStatus>{
  constructor(props){
    super(props);
    this.state = {
       index: this.props.index || 0
    };
  };

  handleChangeIndex(index){
    this.setState({
      index: index
    })
  }

  render(){
    let ui_status = [];
    let _classname = this.props.className ? ' ' + this.props.className : '';
    let ui_imglist = this.props.imgList.length > 0 && this.props.imgList.map((img, index) => {
      ui_status.push(<span key={index} className={this.state.index == index ? 'on' : ''}></span>);
      return img.linkTo ? <Link className={styl.item} key={index} to={img.linkTo}>
        <img src={img.url} alt={img.title}/>
      </Link> : <img key={index} src={img.url} alt={img.title}/>;
    });
    return <div className={`${styl.slideTouch}${_classname} slideTouch`}>
      <div className={styl.imgListContainer}>
        <SwipeableViews index={this.state.index} onChangeIndex={this.handleChangeIndex.bind(this)}>{ui_imglist}</SwipeableViews>
      </div>
      <div className={`${styl.status} status`}>{ui_status.map((stat) => stat)}</div>
    </div>; 
  }
}