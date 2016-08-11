import * as React from 'react';
import * as Relay from "react-relay";
const skeleton = require('../assets/css/skeleton.styl');
import {
  Userarea
} from '../../../vender.src/components/UserareaComp';
import {
  Menu
} from '../../../vender.src/components/MenuComp';
import {
  Topbar
} from '../../../vender.src/components/BarComp';
import {
  MountAnima,
  MountAnimaShow
} from '../../../vender.src/components/Animate';

const icos = {
  fire: ['M10.031 32c-2.133-4.438-0.997-6.981 0.642-9.376 1.795-2.624 2.258-5.221 2.258-5.221s1.411 1.834 0.847 4.703c2.493-2.775 2.963-7.196 2.587-8.889 5.635 3.938 8.043 12.464 4.798 18.783 17.262-9.767 4.294-24.38 2.036-26.027 0.753 1.646 0.895 4.433-0.625 5.785-2.573-9.759-8.937-11.759-8.937-11.759 0.753 5.033-2.728 10.536-6.084 14.648-0.118-2.007-0.243-3.392-1.298-5.312-0.237 3.646-3.023 6.617-3.777 10.27-1.022 4.946 0.765 8.568 7.555 12.394z"></path>']
};
const mock: any[] = [
  {
    id: 201,
    name: "system 01",
    icon: icos.fire,
    url: "sys/201"
  },
  {
    id: 202,
    name: "system 02",
    icon: icos.fire,
    child: [
      {
        id: 2021,
        name: "system 02-1",
        icon: icos.fire,
        url: "sys/2021"
      },
      {
        id: 2022,
        name: "system 02-2",
        icon: icos.fire,
        url: "sys/2022"
      }
    ]
  },
  {
    id: 203,
    name: "system 03",
    icon: icos.fire,
    url: "sys/203"
  },
  {
    id: 204,
    name: "system 04",
    icon: icos.fire,
    child: [
      {
        id: 2041,
        name: "system 04-1",
        icon: icos.fire,
        url: "sys/2041"
      },
      {
        id: 2042,
        name: "system 04-2",
        icon: icos.fire,
        url: "sys/2042"
      }
    ]
  }
];

export interface DashboardProps {};

class Dashboard extends React.Component<DashboardProps, {}>{
  render(){
    return <MountAnimaShow>
      <div className={`${skeleton.root} fmroot`}>
        <div className={`${skeleton.fmLeft} fmleft`}>
          <Userarea className={`usra`} imgSize={skeleton.usrImgSize} borderSize={skeleton.usrImgBorderSize}/>
          <Menu className={`${skeleton.menu} menu`} lists={mock}/>
        </div>
        <div className={`${skeleton.fmRight} fmbody`}>
          <Topbar className={skeleton.fmTop} 
            imgres={``}
            settingurl={`setting`} 
            exiturl={`signin`}
          />
          <div className={skeleton.bodyWrap}>
            {this.props.children}
          </div>
        </div>
      </div>
    </MountAnimaShow>;
  }
}

export default Relay.createContainer(Dashboard, {
  fragments: {
    viewer: () => Relay.QL`
      fragments on system {
        id,
        name,
        brief
      }
    `
  }
})
