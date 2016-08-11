var getBabelRelayPlugin = require('babel-relay-plugin');
let Midfy = require('../config').default;
var __schema = require(`${Midfy.ENV_PROJECTPATH}/data/schema.json`);

module.exports = getBabelRelayPlugin(__schema.data);