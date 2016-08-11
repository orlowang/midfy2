import * as React from 'react';
import {
  Link
} from 'react-router';
import {
  Search
} from "../SearchComp";
import {
  Message
} from "../MesgComp";
const styl = require('./style.styl');

export interface TopbarProps {
  className?: string;
  imgres: string;
  settingurl: string;
  exiturl: string;
};

/**
 * Topbar
 */
export class Topbar extends React.Component<TopbarProps, {}>{
  render(){
    const { imgres } = this.props;
    let _classname = this.props.className ? ' ' + this.props.className : '';
    return <div className={`${styl.topbar}${_classname} topbar`}>
      <img src={this.props.imgres}/>
      <Search></Search>
      <div className={styl.group}>
        <Message homeurl={'/'} className={styl.message}></Message>
        <Link className={`${styl.setting} setting`} to={`/${this.props.settingurl}`}>
          <svg viewBox="0 0 512 512">
            <g xmlns="http://www.w3.org/2000/svg">
              <path d="M352,104c8.837,0,16,7.163,16,16s-7.163,16-16,16s-16-7.163-16-16S343.163,104,352,104 M352,88c-17.645,0-32,14.355-32,32   s14.355,32,32,32s32-14.355,32-32S369.645,88,352,88L352,88z"/>
              <path d="M352,376c8.837,0,16,7.163,16,16s-7.163,16-16,16s-16-7.163-16-16S343.163,376,352,376 M352,360c-17.645,0-32,14.355-32,32   s14.355,32,32,32s32-14.355,32-32S369.645,360,352,360L352,360z"/>
              <g>
                <path d="M160,240c8.837,0,16,7.163,16,16s-7.163,16-16,16s-16-7.163-16-16S151.163,240,160,240 M160,224    c-17.645,0-32,14.355-32,32s14.355,32,32,32s32-14.355,32-32S177.645,224,160,224L160,224z"/>
                <g>
                  <path d="M207.32,248H480v16H207.32c0.439-2.604,0.68-5.273,0.68-8S207.76,250.604,207.32,248z"/>
                  <path d="M112,256c0,2.727,0.24,5.396,0.68,8H32v-16h80.68C112.24,250.604,112,253.273,112,256z"/>
                  <path d="M399.32,384H480v16h-80.68c0.439-2.604,0.68-5.273,0.68-8S399.76,386.604,399.32,384z"/>
                  <path d="M304,392c0,2.727,0.24,5.396,0.68,8H32v-16h272.68C304.24,386.604,304,389.273,304,392z"/>
                  <path d="M399.32,112H480v16h-80.68c0.439-2.604,0.68-5.273,0.68-8S399.76,114.604,399.32,112z"/>
                  <path d="M304.68,112c-0.439,2.604-0.68,5.273-0.68,8s0.24,5.396,0.68,8H32v-16H304.68z"/>
                </g>
              </g>
            </g>
          </svg>
        </Link>
        <Link className={`${styl.exit} exit`} to={`/${this.props.exiturl}`}>
          <svg viewBox="0 0 512 512">
            <g xmlns="http://www.w3.org/2000/svg">
              <polygon points="366.863,323.883 389.49,346.51 480,256 389.49,165.49 366.862,188.118 418.745,240 192,240 192,272 418.745,272     "/>
              <g>
                <path d="M391.491,391.766C355.229,428.029,307.018,448,255.736,448c-51.287,0-99.506-19.971-135.772-56.235    C83.697,355.501,64,307.285,64,256c0-51.281,19.697-99.495,55.965-135.761C156.232,83.973,204.45,64,255.736,64    c51.279,0,99.491,19.973,135.755,56.238c2.527,2.528,4.966,5.121,7.333,7.762h40.731c-40.474-58.028-107.709-96-183.819-96    C132.021,32,32,132.298,32,256c0,123.715,100.021,224,223.736,224c76.112,0,143.35-37.97,183.822-96h-40.73    C396.46,386.643,394.021,389.236,391.491,391.766z"/>
              </g>
            </g>
          </svg>
        </Link>
      </div>
    </div>; 
  }
}