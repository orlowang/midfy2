import path from 'path';
import _ from 'lodash';
import fs from 'fs';

const files = fs.readdirSync(path.resolve(__dirname, '../src'));
_.remove(files, function(arr){
    return arr.indexOf('.') == 0 && arr
})
let argvname, projectName;
const basepath = path.resolve(__dirname, '../');
process.argv.forEach((argv) => {
    if (argv.indexOf('--prj-') == 0) {
        argvname = argv.replace('--prj-', '');
        return;
    }
})
projectName = argvname == "default" ? files[0] : argvname;
const projectpath = path.resolve(__dirname, `../src/${projectName}`);
const Midfycfg = {
    // This refers to the react-boilerplate version this project is based on.
    version: '0.1.0',
    app: {
        entry: [`${projectpath}/app.tsx`],
        output: `${basepath}/build/${projectName}`

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
        dllsOut: `${basepath}/.__DLLs/${projectName}`
    },
    server: {
        devport: 8088
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