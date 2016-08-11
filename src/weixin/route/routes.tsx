// import { injectReducer } from '../store/reducers'

const _list = [];

export const Contentwrap = {
  path: '/sys/:sysid',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */ 
      const Overview = require('../views/overview').default
      cb(null, Overview)

    /* Webpack named bundle   */
    }, 'Overview')
  }
}
_list.push(Contentwrap);

export const Setting = {
  path: '/setting',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Setting = require('../views/setting').default
      cb(null, Setting)
    }, 'Setting')
  }
}
_list.push(Setting);

export default _list
