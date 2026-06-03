require('ts-node/register/transpile-only');

const { babelTransform } = require('../../src/jest/babelTransform');

module.exports = babelTransform;
