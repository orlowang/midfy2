import * as React from 'react';
import {
  Link
} from 'react-router';
import {
  Title
} from '../TextComp';
const styl = require('./style.styl');

class MessageType {
  roleid: string;
  rolename: string;
  title: string;
  brief: string;
  datetime: string;
}

export interface MessageProps {
  className?: string;
  title?: string;
  homeurl?: string;
  alltext?: string;
};

export interface MessageState {
  isopen?: boolean;
  messages?: MessageType[];
};

/**
 * Message
 */
export class Message extends React.Component<MessageProps, MessageState>{
  constructor(props){
    super(props);
    this.state = {
      isopen: false,
      messages: []
    };
  };

  componentDidMount(){
    this.setState({
      messages: [
        {
          roleid: '01',
          rolename: 'test',
          title: 'this is a test message!',
          brief: 'this is a brief text',
          datetime: '2016.7.20'
        },
        {
          roleid: '02',
          rolename: 'test2',
          title: 'this is a test message!',
          brief: 'this is a brief text',
          datetime: '2016.7.20'
        },
        {
          roleid: '03',
          rolename: 'test3',
          title: 'this is a test message!',
          brief: 'this is a brief text',
          datetime: '2016.7.20'
        }
      ]
    });
    document.addEventListener('click', (e) => {
      this.state.isopen && e.target != this.refs.Handle && e.target.parentNode != this.refs.Handle && this.setState({
        isopen: false
      })
    })
  }

  openSublist(){
    this.setState({
      isopen: !this.state.isopen
    })
  }

  render(){
    let _classname = this.props.className ? ' ' + this.props.className : '';
    let ui_tips = this.state.messages.length > 0 && <sub className="tips">{this.state.messages.length}</sub>
    let ui_mesg_list = this.state.messages.map((message, index) => {
      return <li key={index}>
        <Title>{message.title}</Title>
        <span>{message.datetime}</span>
        <p>{message.brief}</p>
      </li>
    });
    return <div className={`${styl.message}${_classname} message`}
      onClick={this.openSublist.bind(this)}
      >
      <svg ref="Handle" viewBox="0 0 512 512">
        <path d="M381.7,225.9c0-97.6-52.5-130.8-101.6-138.2c0-0.5,0.1-1,0.1-1.6c0-12.3-10.9-22.1-24.2-22.1c-13.3,0-23.8,9.8-23.8,22.1   c0,0.6,0,1.1,0.1,1.6c-49.2,7.5-102,40.8-102,138.4c0,113.8-28.3,126-66.3,158h384C410.2,352,381.7,339.7,381.7,225.9z M107.2,368   c8.6-9,16.4-18.4,22.7-31.8c12-25.3,17.4-59.2,17.4-110.2c0-46.4,12.5-80.4,37.1-101.2c22.9-19.3,51.7-23.3,71.8-23.3   c20.1,0,48.9,4,71.6,23.3c24.5,20.7,37,54.5,37,100.9c0,83.8,14.9,117.3,40.3,142.3H107.2z"/>
        <path d="M256.2,448c26.8,0,48.8-19.9,51.7-43H204.5C207.3,428.1,229.4,448,256.2,448z"/>
      </svg>
      {ui_tips}
      {this.state.isopen && <ul className={styl.list}>
        <li>
          <span>{this.props.title || 'Messages'}</span>
          {this.props.homeurl && <Link to={this.props.homeurl}>{this.props.alltext || 'SEE ALL'}</Link>}
        </li>
        {ui_mesg_list}
      </ul>}
    </div>; 
  }
}