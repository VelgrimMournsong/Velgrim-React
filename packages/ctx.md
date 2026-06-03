Status: React 19 library migration completed through package validation.

Current context:
- Root pnpm workspace added at `C:\agentic\Velgrim-React` with `packageManager: pnpm@11.5.1`, root `pnpm-lock.yaml`, and package/example-local lockfiles removed.
- `@velgrim/testing`, `@velgrim/core`, and `@velgrim/rxjs` now use React 19 dev dependencies/types, React peer range `^18.3.1 || ^19.0.0`, TypeScript 5.9.3, Jest 30, and `jsx: react-jsx`.
- `@velgrim/testing` no longer uses `react-dom/test-utils`, legacy `react-dom` render, `unmountComponentAtNode`, `@testing-library/react-hooks`, Storybook prerelease deps, webpack 4, `react-app-polyfill`, `ts-jest`, or `camelcase`.
- `@velgrim/core` has real `build`/`typecheck` scripts and replaced `uuid` with `globalThis.crypto.randomUUID()` plus a v4 fallback.
- `@velgrim/rxjs` now uses `useLayoutEffect` for subscription lifecycle setup/cleanup, documents the lifecycle and `useSyncExternalStore` audit in `packages/rxjs/docs/subscription-lifecycle.md`, and fixes derived observable `useState()` storage for `useMap()`/`usePipe()`.
- New coverage validates testing helper cleanup, `createUniqueId`/`useUniqueId`, rxjs StrictMode subscription cleanup, pre-passive-effect subscription timing, and the Fixture Manager critical path.

Validation passed:
- `pnpm dlx pnpm@11.5.1 install --frozen-lockfile`
- `pnpm dlx pnpm@11.5.1 --filter @velgrim/testing test`
- `pnpm dlx pnpm@11.5.1 --filter @velgrim/core test`
- `pnpm dlx pnpm@11.5.1 --filter @velgrim/rxjs test`
- `pnpm dlx pnpm@11.5.1 test`
- `pnpm dlx pnpm@11.5.1 typecheck`
- `pnpm dlx pnpm@11.5.1 build`

Next:
- Commit and push the validated library migration.
- Migrate `examples/shopping-cart` separately after this commit: switch it to workspace package references, React 19, and a modern build toolchain or webpack 5.

High-leverage decisions:
- Choose the example app migration path: replace the copied CRA/webpack 4 toolchain with a modern app tool, or preserve the current structure with a webpack 5 migration.
- Choose package output strategy before adding `exports`: CommonJS-only with local/platform replacements, dual ESM/CJS, or ESM-only major release.
- Decide whether the future `@velgrim/rxjs` runtime semantics audit should adopt `useSyncExternalStore` for `RxObservable.useState()` snapshots or keep the current event/store model.
