export default {
  login: (callback) => {
    console.log(this)
    callback && callback(true)
  },
  quit: () => {

  },
  expired: () => {

  }
}