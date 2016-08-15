// import { injectReducer } from '../store/reducers'

const _list = [];

export const DetailRoutes = {
  path: '/detail/:goodsid',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Detail = require('../views/detail').default
      cb(null, Detail)
    }, 'Detail')
  }
}
_list.push(DetailRoutes);

export default _list
