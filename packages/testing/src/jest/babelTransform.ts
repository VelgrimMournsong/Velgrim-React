const babelJest = require('babel-jest').default;

export const babelTransform = babelJest.createTransformer({
    presets: [
        '@babel/preset-env',
        '@babel/preset-typescript',
        // [
        //     '@emotion/babel-preset-css-prop',
        //     { autoLabel: 'dev-only', labelFormat: '[local]' }
        // ],
        [
            '@babel/preset-react',
            { runtime: 'automatic', importSource: '@emotion/react' }
        ]
    ],
    plugins: [
        // [
        //     '@emotion/babel-plugin',
        //     { autoLabel: 'dev-only', labelFormat: '[local]' }
        // ]
        '@emotion/babel-plugin',
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        "@babel/plugin-transform-runtime"
    ],
    babelrc: false,
    configFile: false,
});
