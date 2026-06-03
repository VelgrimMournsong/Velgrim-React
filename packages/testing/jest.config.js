require('ts-node/register/transpile-only');

const { createJestConfig } = require('./src/jest/createJestConfig');

module.exports = createJestConfig('@velgrim/testing');
