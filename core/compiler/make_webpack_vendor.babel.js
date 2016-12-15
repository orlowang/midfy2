import webpack from 'webpack';
import Midfy from '../config';

module.exports = require('./webpack_conf')({
  entry: {
    vendor: ['react', 'react-dom', 'whatwg-fetch']
  },
  output: {
    path: `${Midfy.ENV_BASEPATH}/build/vendor`
  },
  module: {
    noParse: ['react', 'react-dom', 'whatwg-fetch']
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    alias: {
      'react': `${Midfy.ENV_BASEPATH}/node_modules/react/dist/react.min.js`,
      'react-dom': `${Midfy.ENV_BASEPATH}/node_modules/react-dom/dist/react-dom.min.js`,
      'whatwg-fetch': `${Midfy.ENV_BASEPATH}/node_modules/whatwg-fetch/fetch.js`
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
