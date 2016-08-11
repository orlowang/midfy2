import * as React from 'react';
const styl = require('./style.styl');

export interface UploadProps {
  className?: string;
  viewSize?: string;
};

interface UploadState {
}
/**
 * Upload
 */
export class Upload extends React.Component<UploadProps, UploadState>{
  constructor(props){
    super(props);
    this.state = {
    };
  };

  refs : {
    [key: string]: (Element);
    file: (HTMLDivElement)
  }

  componentDidMount(){
  }

  passClick(){
    const file = this.refs.file;
    file && file.click()
  }

  render(){
    let _classname = this.props.className ? ' ' + this.props.className : '';
    return <div className={`${styl.upload}${_classname} uploadComp`}>
      {this.props.viewSize && <div className={`${styl.view} view`} style={{width: this.props.viewSize, height: this.props.viewSize}}></div>}
      <div onClick={this.passClick.bind(this)}>{this.props.children}</div>
      <input ref="file" type="file"/>
    </div>; 
  }
}