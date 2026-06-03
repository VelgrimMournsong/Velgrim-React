require('ts-node/register/transpile-only');

const { cssTransform } = require('../../../testing/src/jest/cssTransform');
module.exports = cssTransform;
