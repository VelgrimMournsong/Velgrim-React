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
- Do not continue execution from the plan until the next explicit instruction.
- Migrate `examples/shopping-cart` separately with Vite, not webpack 5. The example should validate package consumption, not preserve obsolete CRA/webpack 4 app tooling.
- Prove the React 19 package surface in Fixture Manager before changing package `exports` or runtime semantics.

High-leverage decisions:
- Example app path decided: replace CRA/webpack 4 with Vite.
- Package output decision deferred: preferred eventual direction is dual ESM/CJS, but wait to add `exports` until Fixture Manager successfully consumes the migrated packages.
- RxJS runtime audit deferred: trigger it only if Fixture Manager's normalized projection, selector hooks, or patch flow surfaces render/subscription issues. Evaluate `useSyncExternalStore` then; otherwise avoid runtime churn.
