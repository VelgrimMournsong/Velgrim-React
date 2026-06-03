require('ts-node/register/transpile-only');

const { fileTransform } = require('../../../testing/src/jest/fileTransform');
module.exports = fileTransform;
