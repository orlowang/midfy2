import path from 'path';
import _ from 'lodash';
import fs from 'fs';

const basepath = path.resolve(__dirname, '../');
const projectpath = path.resolve(__dirname, `../src`);
const Midfycfg = {
    // This refers to the react-boilerplate version this project is based on.
    version: '0.1.0',
    app: {
        entry: [`${basepath}/src/app.tsx`],
        output: `${basepath}/build`

    },
    vendors: ['react', 'react-dom', 'react-relay', 'react-router'],
    // 
    ENV_DEVELOPMENT: process.env.NODE_ENV == "development",
    ENV_BASEPATH: basepath,
    ENV_PROJECTPATH: projectpath,
    compile: {
        image: {
            encoding: "progressive",
            optimizationLevel: 7,
            quality: "65-90",
            speed: 4
        },
        dlls: ['react', 'react-dom', 'react-relay', 'react-router'],
        dllsOut: `${basepath}/.__DLLs`,
        enableMobileModule: false,
    },
    server: {
        devport: 8088
    },
    SIMPLE_GRAPHQL_SRV: {
        port: 8089
    },
    AUTOPREFIXER_BROWSERS: [
        'Android 2.3',
        'Android >= 4',
        'Chrome >= 35',
        'Firefox >= 31',
        'Explorer >= 9',
        'iOS >= 7',
        'Opera >= 12',
        'Safari >= 7.1',
    ]
};

export default Midfycfg;