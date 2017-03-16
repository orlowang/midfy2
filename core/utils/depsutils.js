import path from 'path';
import fs from 'fs';
import chalk from "chalk";
import crypto from 'crypto';
import Midfy from '../config';
import _ from 'lodash';
import getNowDatetime from '../utils/datetime';
import dependencies from '../utils/dependencies';

export let doManifast = (deps, callback) => {
  let data = _.assign(getDepsVersion(deps), {"createtime": getNowDatetime()});
  // append data to 'self_deps.json', auto creating the file if it does not yet exist!
  fs.writeFile(`${Midfy.compile.dllsOut}/dllsVersion.json`, JSON.stringify(data), 'utf8', (err) => {
    if (err) throw err;
    callback()
  })
}

export let getDepsVersion = (deps) => {
  let manifast = {};
  _.mapKeys(deps, (dep) => {
    !_.has(dependencies, dep) && console.log(chalk.red(`${dep} is not found! try 'npm i --save ${dep}'`))
    manifast[dep] = _.get(dependencies, dep)
  })

  return {
    version: crypto.createHash('md5').update(String(manifast)).digest("hex"),
    manifast: manifast
  }
}
