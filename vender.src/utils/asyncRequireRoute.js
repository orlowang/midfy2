export default (routePath, cb) => {
  require.ensure([], (require) => {
    const SignIn = require('../views/signin').default
    cb(null, SignIn)
  }, 'SignIn')
}