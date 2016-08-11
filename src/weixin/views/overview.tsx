import * as React from 'react';
import {
  MountAnima
} from '../../../vender.src/components/Animate';
const skeleton = require('../assets/css/skeleton.styl');

export interface OverviewProps {};

export default class Overview extends React.Component<OverviewProps, {}>{

  componentDidMount(){

  }

  render(){
    return <MountAnima>
      <div className={`${skeleton.Overview} overview`}>
        {`route params is: ${JSON.stringify(this.props.params)}`}
      </div>
    </MountAnima>;
  }
}
