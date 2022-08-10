import { createSerializer } from '@emotion/jest';
import { matchers } from '@emotion/jest';
// import { setupStaticIds } from '@velgrim/testing';

expect.addSnapshotSerializer(createSerializer());
expect.extend(matchers);
// setupStaticIds();