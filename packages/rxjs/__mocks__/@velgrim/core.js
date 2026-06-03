'use strict';
require('ts-node/register/transpile-only');

const { mockCore } = require('../../../testing/src/libraries');
module.exports = mockCore();
