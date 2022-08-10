import { createSerializer } from '@emotion/jest';
import { matchers } from '@emotion/jest';

expect.addSnapshotSerializer(createSerializer());
expect.extend(matchers);