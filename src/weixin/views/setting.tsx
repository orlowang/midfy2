import * as React from 'react';
const skeleton = require('../assets/css/skeleton.styl');
import {
  MountAnima
} from '../../../vender.src/components/Animate';
import {
  Switch
} from '../../../vender.src/components/SwitchComp';
import {
  Upload
} from '../../../vender.src/components/UploadComp';
import {
  TextInput,
  Title
} from '../../../vender.src/components/TextComp';

const keys = [
  {
    bgcolor: '#ff6600',
    name: 'a'
  },
  {
    bgcolor: '#0ead87',
    name: 'b'
  },
  {
    bgcolor: '#337ab7',
    name: 'c'
  },
  {
    bgcolor: '#af64cc',
    name: 'd'
  }
]

export interface SettingProps {
};

export default class Setting extends React.Component<SettingProps, {}>{

  componentDidMount(){

  }

  render(){
    let __key = keys.map((key) => {
      return <div key={key.name} className={skeleton.key} 
        style={{backgroundColor: key.bgcolor}}
      ></div>
    });
    return <MountAnima>
      <div className={`${skeleton.setting} setting`}>
        <div className={skeleton.list}>
          <Title className={skeleton.title}>主题</Title>
          <div className={skeleton.keylist}>
            {__key}
          </div>
        </div>
        <div className={skeleton.list}>
          <Title className={skeleton.title}>个人信息</Title>
          <div className={skeleton.keylist}>
            <div>
              <Upload viewSize={skeleton.uploadViewSize} className={skeleton.upload}>
                <a href="javascript:void(0);">upload file</a>
              </Upload>
            </div>
            <div>
              <TextInput className={skeleton.input} placeholder="帐户" default={`wangyz08`}></TextInput>
              <TextInput className={skeleton.input} placeholder="用户名" default={`Orlo`}></TextInput>
              <TextInput className={skeleton.input} placeholder="电子邮件" default={`wangyz08@vanke.com`}></TextInput>
              <TextInput className={skeleton.input} placeholder="密码" default={`**********`}></TextInput>
            </div>
          </div>
        </div>
        <div className={skeleton.list}>
          <Title className={skeleton.title}>通知</Title>
          <div className={skeleton.keylist}>
            <Switch className={skeleton.switch} size={skeleton.switchSize}>电子邮件通知</Switch>
          </div>
        </div>
      </div>
    </MountAnima>;
  }
}
