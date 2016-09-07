import * as Relay from 'react-relay';

export default class OrderMutation extends Relay.Mutation<any, any>{
  static fragments = {

  };

  getMutation(){
    return Relay.QL`mutation { order }`
  }

  getVariables(){
    return {
      detail: this.props
    }
  }

  getFatQuery(){
    return Relay.QL`
      fragment on UpdateOrderPayload{
        orderId,
        price
      }
    `
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        orderId: this.props.orderId,
        price: this.props.price
      },
    }];
  }
}