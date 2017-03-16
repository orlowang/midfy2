import https from 'https';
import fs from 'fs';
import chalk from "chalk";
import express from 'express';

const privateKey = fs.readFileSync('/Users/Orlo/.ssh/privatekey.pem', 'utf8');
const certificate = fs.readFileSync('/Users/Orlo/.ssh/certificate.pem', 'utf8');
const serv = express();

let credentials = {key: privateKey, cert: certificate};
let HTTPS = https.createServer(credentials, serv);

HTTPS.listen(8443);
console.log(chalk.black(chalk.bgWhite("HTTPS server start on https://dev.local:8443")))