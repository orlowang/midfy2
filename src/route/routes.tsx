// import { injectReducer } from '../store/reducers'

const _list = [];

export const OverviewRoutes = {
  path: '/sys/:sysid',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Overview = require('../views/overview').default
      cb(null, Overview)
    }, 'Overview')
  }
}
_list.push(OverviewRoutes);

export default _list
