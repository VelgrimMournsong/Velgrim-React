require('ts-node/register/transpile-only');

const { createJestConfig } = require('../testing/src/jest/createJestConfig');

module.exports = createJestConfig('@velgrim/core');
