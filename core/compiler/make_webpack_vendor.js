let webpack = require('webpack');
let Midfy = require('../config');

module.exports = require('./webpack_conf')({
  entry: {
    vendor: ['react', 'react-dom', 'react-redux', 'redux', 'graphql']
  },
  output: {
    path: `${Midfy.ENV_BASEPATH}/build/vendor`
  },
  module: {
    noParse: ['react', 'react-dom', 'react-redux', 'redux']
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    alias: {
      'react': `${Midfy.ENV_BASEPATH}/node_modules/react/dist/react.min.js`,
      'react-dom': `${Midfy.ENV_BASEPATH}/node_modules/react-dom/dist/react-dom.min.js`,
      'react-redux': `${Midfy.ENV_BASEPATH}/node_modules/react-redux/dist/react-redux.min.js`,
      'redux': `${Midfy.ENV_BASEPATH}/node_modules/redux/dist/redux.min.js`
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name].[chunkhash].js'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
        drop_debugger: true,
        drop_console: true
      }
    })
  ]
})
