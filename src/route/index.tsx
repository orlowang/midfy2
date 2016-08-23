// We only need to import the modules necessary for initial render
import * as Relay from "react-relay";
import Dashboard from '../views/Dashboard';
import ViewerQuery from "./ViewerQuery";
import Routes from './routes';

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */
let CreateRoutes = [];

export const DashboardRoutes = {
  path: '/',
  component: Dashboard,
  childRoutes: Routes,
  queries: ViewerQuery
}
CreateRoutes.push(DashboardRoutes)

export const SigninRoutes = {
  path: '/signin',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Signin = require('../views/Signin').default
      cb(null, Signin)
    }, 'Signin')
  },
  queries: ViewerQuery
}
CreateRoutes.push(SigninRoutes)

export default CreateRoutes