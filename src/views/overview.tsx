import * as React from 'react';
import * as Relay from "react-relay";
import {
  MountAnima
} from '../../vender.src/components/Animate';
const skeleton = require('../assets/css/skeleton.styl');

export interface OverviewProps {};

class Overview extends React.Component<OverviewProps, {}>{

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

export default Relay.createContainer(Overview, {
  fragments: {
    viewer: () => Relay.QL`
      fragments on Viewer {
        menu {
          id,
          name,
          keyprop,
          url,
          child {
            id,
            name,
            keyprop,
            url,
          }
        }
      }
    `
  }
})
