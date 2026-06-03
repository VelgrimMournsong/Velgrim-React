require('ts-node/register/transpile-only');

const { babelTransform }  = require('../../../testing/src/jest/babelTransform');
module.exports = babelTransform;
