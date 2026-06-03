require('ts-node/register/transpile-only');

const { resolveSnapshot } = require('../../../testing/src/jest/resolveSnapshot');
module.exports = resolveSnapshot;
