require('ts-node/register/transpile-only');

const { fileTransform } = require('../../src/jest/fileTransform');

module.exports = fileTransform;
