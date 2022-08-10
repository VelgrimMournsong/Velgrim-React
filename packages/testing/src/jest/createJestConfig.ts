import type { Config } from '@jest/types';

// docs: https://jestjs.io/docs/configuration
export function createJestConfig(
    moduleName: string,
    configure?: (options: Config.InitialOptions) => Config.InitialOptions
): Config.InitialOptions {
    let config: Config.InitialOptions = {
        roots: [
            '<rootDir>'
        ],
        collectCoverageFrom: [
            'src/**/*.{js,jsx,ts,tsx}',
            '!src/**/*.d.ts'
        ],
        setupFiles: [
            'react-app-polyfill/jsdom',
            '<rootDir>/config/jest/setupTests'
        ],
        setupFilesAfterEnv: [
            // '@testing-library/jest-dom/extend-expect',
            '<rootDir>/config/jest/setupTestsAfterEnv'
        ],
        testMatch: [
            // '<rootDir>/spec/**/*.{spec,tests}.{js,jsx,ts,tsx}',
            // '<rootDir>/spec/**/{spec,tests}.{js,jsx,ts,tsx}'
            '<rootDir>/spec/**/*.spec.{js,jsx,ts,tsx}',
            '<rootDir>/spec/**/spec.{js,jsx,ts,tsx}',
            '<rootDir>/spec/**/*.tests.{js,jsx,ts,tsx}',
            '<rootDir>/spec/**/tests.{js,jsx,ts,tsx}'
        ],
        testEnvironment: 'jsdom',
        // testRunner: '<rootDir>\\node_modules\\jest-circus\\runner.js',
        transform: {
            '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': '<rootDir>/config/jest/babelTransform.js',
            '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
            '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js'
        },
        transformIgnorePatterns: [
            '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
            '^.+\\.module\\.(css|sass|scss)$'
        ],
        moduleNameMapper: {
            [`^${moduleName}(.*)$`]: "<rootDir>/src$1"
        },
        // modulePaths: [],
        // moduleFileExtensions: [
        //     'web.js',
        //     'js',
        //     'web.ts',
        //     'ts',
        //     'web.tsx',
        //     'tsx',
        //     'json',
        //     'web.jsx',
        //     'jsx',
        //     'node'
        // ],
        resetMocks: true,
        // silent: false,
        snapshotResolver: './config/jest/resolveSnapshot.js'
        // verbose: true
    };

    if (configure) {
        config = configure(config);
    }

    return config;
}