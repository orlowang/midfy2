import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import precss from 'precss';
import autoprefixer from 'autoprefixer';
import _ from 'lodash';
import { urlToRequest } from 'loader-utils';
import Midfy from '../config';

const usercfg = require(`${Midfy.ENV_PROJECTPATH}/config.json`);
const webpackConfig = {
    entry: {
        app: usercfg.app.entry || Midfy.app.entry,
        vendor: ['react', 'react-dom', 'whatwg-fetch']
    },
    output: {
        // Don't use hashes in dev mode for better performance
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        path: Midfy.app.output
    },
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
        alias: {
            'react': `${Midfy.ENV_BASEPATH}/node_modules/react/dist/react.min.js`,
            'react-dom': `${Midfy.ENV_BASEPATH}/node_modules/react-dom/dist/react-dom.min.js`,
            'whatwg-fetch': `${Midfy.ENV_BASEPATH}/node_modules/whatwg-fetch/fetch.js`
        }
    },
    module: {
        noParse: ['react', 'react-dom', 'whatwg-fetch'],
        loaders: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loaders: [
                    `babel?passPerPreset,presets[]=stage-0,presets[]=es2015,plugins[]=transform-class-properties,plugins[]=babel-relay-plugin-loader`,
                    'ts'
                ]
            },
            {
                test: /\.js$/,
                loader: 'source-map-loader'
            },
            {
                test: /\.css$/,
                loaders: [
                    'style',
                    `css?{
                        "sourceMap":${!Midfy.ENV_DEVELOPMENT},
                        "modules":false,
                        "importLoaders": 1,
                        "localIdentName":"${Midfy.ENV_DEVELOPMENT ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]'}",
                        "minimize":${!Midfy.ENV_DEVELOPMENT}
                    }`
                ]
            },
            {
                test: /\.styl$/,
                loaders: [
                    'style',
                    `css?{
                        "sourceMap":${!Midfy.ENV_DEVELOPMENT},
                        "modules":true,
                        "importLoaders": 1,
                        "localIdentName":"${Midfy.ENV_DEVELOPMENT ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]'}",
                        "minimize":${!Midfy.ENV_DEVELOPMENT}
                    }`,
                    'postcss',
                    'stylus'
                ]
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    `image-webpack?{
                        progressive: ${Midfy.compile.image.encoding == "progressive"},
                        optimizationLevel: ${Midfy.compile.image.optimizationLevel},
                        interlaced: ${Midfy.compile.image.encoding == "progressive"}
                    }`,
                ],
            },
            {
                test: /\.svg$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]'
                ],
            }
        ]
    },
    plugins: [
        //Typically you'd have plenty of other plugins here as well
        new webpack.DllReferencePlugin({
            context: `${Midfy.ENV_BASEPATH}`,
            manifest: require(`${Midfy.compile.dllsOut}/dlls.json`)
        }),
        // OccurrenceOrderPlugin is needed for long-term caching to work properly.
        // See http://mxs.is/googmv
        new webpack.optimize.OccurrenceOrderPlugin(true),

        // Merge all duplicate modules
        // new webpack.optimize.DedupePlugin(),
        
        // Minify and optimize the index.html
        new HtmlWebpackPlugin({
            template: `${Midfy.ENV_BASEPATH}/core/templates/index.html`,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
            inject: true,
            debug: !!Midfy.ENV_DEVELOPMENT
        }),
    ],
    postcss: () => {
        return [
            precss(),
            autoprefixer({ browsers: Midfy.AUTOPREFIXER_BROWSERS })
        ]
    }
};

if (!Midfy.ENV_DEVELOPMENT) {
    webpackConfig.plugins.push(
        // Minify and optimize the JavaScript
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                unused: true,
                dead_code: true,
                warnings: false,
                drop_debugger: true,
                drop_console: true
            }
        })
    )
}

if (!Midfy.ENV_DEVELOPMENT) {
    webpackConfig.plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: '[name].[chunkhash].js'
        })
    )
}

export default webpackConfig;
