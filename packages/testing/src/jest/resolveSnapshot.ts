import path from 'path';

/**
 *
 * @param testFilePath FilePath of the test file being tested
 * @param snapshotExtension The extension for snapshots (.snap usually)
 */

function resolveSnapshotPath(testFilePath: string, snapshotExtension: string) {
    const testDirectory = path.dirname(testFilePath);

    const testFileName =
        path
            .basename(testFilePath)
            .replace('.tests.tsx', '.tsx')
            .replace('.tests.ts', '.ts')
            .replace('tests.tsx', 'jsx')
            .replace('tests.ts', 'js')
        + snapshotExtension;

    return path.join(testDirectory, '__snapshots__', testFileName);
}

/**
 *
 * @param snapshotFilePath The filename of the snapshot (i.e. jsx.snap)
 * @param snapshotExtension The extension for snapshots (.snap)
 */
function resolveTestPath(snapshotFilePath: string, snapshotExtension: string) {
    return snapshotFilePath
        .replace('\\__snapshots__', '')
        .replace('/__snapshots__', '')
        .replace(`js${snapshotExtension}`, 'tests.ts')
        .replace(`.ts${snapshotExtension}`, '.tests.ts')
        .replace(`jsx${snapshotExtension}`, 'tests.tsx')
        .replace(`.tsx${snapshotExtension}`, '.tests.tsx');
}

/* Used to validate resolveTestPath(resolveSnapshotPath( {this} )) */
const testPathForConsistencyCheck = path.join('spec', 'tests.tsx');

export const resolveSnapshot = {
    resolveSnapshotPath,
    resolveTestPath,
    testPathForConsistencyCheck
};