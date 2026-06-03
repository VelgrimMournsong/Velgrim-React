require('ts-node/register/transpile-only');

const { createJestConfig } = require('../testing/src/jest/createJestConfig');

module.exports = createJestConfig('@velgrim/rxjs', config => ({
    ...config,
    moduleNameMapper: {
        ...config.moduleNameMapper,
        '^@velgrim/core$': '<rootDir>/../core/src',
        '^@velgrim/core/(.*)$': '<rootDir>/../core/src/$1'
    }
}));
