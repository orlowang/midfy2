// We only need to import the modules necessary for initial render
import * as Relay from "react-relay";
import Mall from '../views/Mall';
import ViewerQuery, {
  goodsDetailQuery,
  goodsOrderQuery
} from "./ViewerQuery";
import Routes from './routes';

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */
let CreateRoutes = [];

export const MallRoutes = {
  path: '/',
  component: Mall,
  queries: ViewerQuery
}
CreateRoutes.push(MallRoutes)

export const DetailRoutes = {
  path: '/detail/:goodsid',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Detail = require('../views/detail').default
      cb(null, Detail)
    }, 'Detail')
  },
  queries: goodsDetailQuery
}
CreateRoutes.push(DetailRoutes)

export const OrderRoutes = {
  path: '/order/:goodsid',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Order = require('../views/order').default
      cb(null, Order)
    }, 'Order')
  },
  queries: goodsOrderQuery
}
CreateRoutes.push(OrderRoutes)

export default CreateRoutes