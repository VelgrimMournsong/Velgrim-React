// This is a custom Jest transformer turning file imports into filenames.
// http://facebook.github.io/jest/docs/en/webpack.html

import path from 'path';

function toPascalCase(value: string): string {
    return value
        .replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, '')
        .split(/[^a-zA-Z0-9]+/)
        .filter(Boolean)
        .map(part => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
        .join('');
}

export const fileTransform = {
    process(src: string, filename: string) {
        const assetFilename = JSON.stringify(path.basename(filename));

        if (filename.match(/\.svg$/)) {
            const pascalCaseFilename = toPascalCase(path.parse(filename).name);

            const componentName = `Svg${pascalCaseFilename}`;

            return { code: `const React = require('react');
      module.exports = {
        __esModule: true,
        default: ${assetFilename},
        ReactComponent: React.forwardRef(function ${componentName}(props, ref) {
          return React.createElement('svg', Object.assign({}, props, { ref: ref }), ${assetFilename});
        }),
      };` };
        }

        return { code: `module.exports = ${assetFilename};` };
    },
};
