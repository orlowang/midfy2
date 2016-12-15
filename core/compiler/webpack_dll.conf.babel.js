import webpack from 'webpack';
import path from 'path';
import Midfy from '../config';

let nowdate = new Date();
const usercfg = require(`${Midfy.ENV_PROJECTPATH}/config.json`);
const compile = usercfg.compile;
const compile_output = {
    filename: 'dlls.js',
    path: Midfy.compile.dllsOut,
    library: 'dlls',
};

export default {
    entry: usercfg.compile.dlls || Midfy.compile.dlls,
    devtool: !compile.devtool ? 'source-map' : compile.devtool,
    output: !compile.output ? compile_output : _.defaultsDeep(compile_output, compile.output),
    plugins: [
      new webpack.DllPlugin({
        name: 'dlls',
        path: path.join(Midfy.compile.dllsOut, 'dlls.json') 
      })
    ]
};
