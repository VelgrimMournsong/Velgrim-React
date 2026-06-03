# React 19 and dependency migration plan

## Scope

- Status: closed. The published libraries in this folder, `@velgrim/testing`, `@velgrim/core`, and `@velgrim/rxjs`, have been migrated and validated for React 19.
- Primary objective: a stable React 19-compatible `@velgrim/rxjs` foundation for Fixture Manager. Latest dependency versions are useful only when they support that objective without adding unnecessary failure sources.
- Use `pnpm` only for installs, updates, lockfile generation, and scripts.
- Treat `latest stable` as the registry `latest` dist-tag returned by `pnpm view`, not `next`, `alpha`, `beta`, `canary`, or package-specific prerelease tags.
- `examples/shopping-cart` has been migrated and validated as the first real consumer.

## Execution guardrails and priorities

- Do not pursue opportunistic refactors.
- The objective is React 19 compatibility, a modern dependency baseline, and proven subscription correctness.
- Prefer proving correctness with tests before changing implementation, especially for `useInsertionEffect`, `useSyncExternalStore`, and StrictMode behavior.
- Preserve public APIs unless a migration blocker requires a change.
- When a public API change is unavoidable, document the reason, the replacement path, and the compatibility impact before implementing it.
- After the shopping-cart Vite migration, do not continue execution until explicitly instructed. The migrated libraries and example are a validated foundation for Fixture Manager.

1. React 19 compatibility
2. `@velgrim/testing` modernization
3. `@velgrim/rxjs` subscription correctness
4. React StrictMode validation
5. pnpm workspace migration
6. build pipeline repair
7. dependency cleanup
8. packaging modernization
9. TypeScript 6

## Current state

- Commit `10b6a2f` completed and pushed the React 19 library migration.
- The follow-up `examples/shopping-cart` migration has now been completed with Vite instead of webpack 5.
- The React 19 migration is closed. The project is now in maintenance / consumer-validation mode.
- Root `pnpm-workspace.yaml` and root `pnpm-lock.yaml` exist.
- Package-local lockfiles were removed.
- `@velgrim/testing`, `@velgrim/core`, and `@velgrim/rxjs` use React 19-compatible dependencies and React peer range `^18.3.1 || ^19.0.0`.
- The migrated package source has been version-bumped for the planned semver-major release: `@velgrim/testing@2.0.0`, `@velgrim/core@2.0.0`, and `@velgrim/rxjs@2.0.0`.
- The packages have not been published. `npm whoami` currently fails with `ENEEDAUTH` on this machine.
- npm `latest` is still the August 2022 React 18-era publish, with React `^18.0.0` peer ranges and old dependencies. The React 19 migration, Vite validation, core browser fix, and `2.0.0` release-prep version bump are currently in git only.
- `@velgrim/testing` no longer uses legacy React DOM test APIs.
- TypeScript configs use `"jsx": "react-jsx"`.
- `@velgrim/core` has real build/typecheck scripts and no longer depends on `uuid`.
- `@velgrim/rxjs` uses `useLayoutEffect` for subscription lifecycle management, with StrictMode and Fixture Manager critical-path coverage.
- `examples/shopping-cart` uses Vite 8, React 19, workspace dependencies on `@velgrim/core` and `@velgrim/rxjs`, and Vite dependency prebundling for the linked CommonJS workspace packages.
- `@velgrim/core` no longer assumes a Node `process` global during `Environment` module evaluation, which was required for browser package consumption through Vite.
- Root `pnpm test`, `pnpm typecheck`, `pnpm build`, and `pnpm --filter shopping-cart build` passed through `pnpm@11.5.1`.
- Browser smoke for `examples/shopping-cart` passed on `http://127.0.0.1:3001/`: initial render had no fresh console errors and add-to-cart updated cart state.

Shopping-cart validated:

- React 19 runtime compatibility.
- Browser consumption.
- Workspace package consumption.
- Vite consumption.
- `@velgrim/core` and `@velgrim/rxjs` consumption together in a real app.

Known consumer issue discovered:

- `@velgrim/core` had a `process.env` module-load assumption that package tests missed and Vite/browser consumption exposed. This is fixed.

No evidence currently justifies:

- dual ESM/CJS migration
- package `exports` modernization
- `useSyncExternalStore` migration

## Publish next

Before relying on these packages outside the workspace, publish the migrated package sources.

Conservative semver path:

- `@velgrim/testing@2.0.0` completed locally
- `@velgrim/core@2.0.0` completed locally
- `@velgrim/rxjs@2.0.0` completed locally

Reason:

- The published npm `latest` packages are still the old August 2022 React 18-era versions.
- The local React peer range is now `^18.3.1 || ^19.0.0`, which excludes React 18.2 and is therefore semver-major for consumers pinned below React 18.3.
- The publish should carry the React 19 dependency migration, the Vite/browser consumption fix, and the validated workspace package behavior.

Current blocker:

- `npm whoami` returns `ENEEDAUTH`; authenticate this machine or publish from a trusted release environment before running the publish commands.

Publish order:

1. `@velgrim/testing`
2. `@velgrim/core`
3. `@velgrim/rxjs`

After publish:

- Use Fixture Manager as the next real consumer.
- Keep package `exports` / dual ESM-CJS modernization deferred until Fixture Manager shows actual friction with the current CommonJS output.

## Target version snapshot

Version checks were gathered with `pnpm outdated --format=json` and `pnpm view <package> version`.

| Area | Target stable version | Notes |
| --- | ---: | --- |
| pnpm | 11.5.1 | Local machine currently has pnpm 9.1.0. Pin the repo with `packageManager` once local and CI can use it. |
| react | 19.2.7 | Use exact dev dependency for local tests. |
| react-dom | 19.2.7 | Use exact dev dependency for local tests. |
| @types/react | 19.2.16 | Remove React 18 type resolutions. |
| @types/react-dom | 19.2.3 | Remove React 18 type resolutions. |
| typescript | 5.9.3 | Use the latest stable TypeScript 5 line for the React 19 migration. Defer TypeScript 6.0.3 until React 19 is green. |
| jest | 30.4.2 | Add explicit `jest-environment-jsdom`. |
| jest-environment-jsdom | 30.4.1 | Required for `testEnvironment: "jsdom"` on modern Jest. |
| babel-jest | 30.4.1 | Keep because the current Jest transform is Babel-based. |
| @types/jest | 30.0.0 | Match Jest 30. |
| @testing-library/react | 16.3.2 | Provides modern React test rendering and `renderHook`. |
| @testing-library/dom | 10.4.1 | Align with Testing Library React 16. |
| @testing-library/jest-dom | 6.9.1 | Update setup import path. |
| @testing-library/user-event | 14.6.1 | Already effectively current. |
| rxjs | 7.8.2 | Current latest stable in the 7 line. |
| webpack | TBD | Determine whether webpack is still required. Remove it if not; if it is required, migrate to webpack 5.107.2 after React validation. |

Additional direct dependency targets:

- Babel: `@babel/core`, `@babel/preset-env`, `@babel/preset-react`, `@babel/preset-typescript`, `@babel/plugin-proposal-decorators`, and `@babel/plugin-transform-runtime` -> `7.29.7`.
- Emotion: `@emotion/react` -> `11.14.0`, `@emotion/jest` -> `11.14.2`, `@emotion/babel-plugin` -> `11.13.5`, `@emotion/babel-preset-css-prop` -> `11.12.0`.
- `@types/node` latest is `25.9.1`; if the repo targets current LTS instead of current Node, use the latest matching LTS type package instead.
- `@types/babel__preset-env` -> `7.10.0`.
- `babel-loader` -> `10.1.1` only if webpack remains required.
- `cross-env` -> `10.1.0`.
- `preact` -> `10.29.2`.
- `ts-node` -> `10.9.2`.
- `storybook-dark-mode` -> `5.0.0` only if Storybook retention is justified.

## Migration phases

### 1. Establish pnpm workspace

Work from the repo root, `C:\agentic\Velgrim-React`, not from an individual package folder.

1. Add `packageManager` and workspace metadata at the root:

   ```json
   {
     "private": true,
     "packageManager": "pnpm@11.5.1",
     "scripts": {
       "build": "pnpm -r --filter '@velgrim/*' build",
       "test": "pnpm -r --filter '@velgrim/*' test",
       "typecheck": "pnpm -r --filter '@velgrim/*' typecheck"
     }
   }
   ```

2. Add `pnpm-workspace.yaml`:

   ```yaml
   packages:
     - "packages/*"
     - "examples/*"
   ```

3. Convert internal package references to workspace protocol:

   - `@velgrim/core` in `@velgrim/rxjs`: `workspace:^`
   - `@velgrim/testing` in `@velgrim/core` and `@velgrim/rxjs`: `workspace:^`

4. Generate one root lockfile:

   ```powershell
   corepack enable
   corepack prepare pnpm@11.5.1 --activate
   pnpm install
   ```

5. After the root lockfile is generated and verified, remove package-level `yarn.lock` files and stale package-local lockfiles.

### 2. Repair build validation scripts

Do this before final React 19 validation. These are published libraries, so passing tests is not enough if package builds cannot run.

1. Add `typecheck` scripts to every package:

   ```json
   {
     "typecheck": "tsc -p tsconfig.json --noEmit"
   }
   ```

2. Replace `@velgrim/core` placeholder scripts:

   - replace `"compile": "TODO:"` with a real compile command
   - replace `"sync": "TODO:"` with the actual copy/sync step, or remove it if it is obsolete
   - keep generated `dist` out of the migration diff unless release artifacts are intentionally committed

3. Make `build` meaningful for every package before treating the React 19 migration as complete.

### 3. Add a safety pass on React 18.3

React's official upgrade guide recommends React 18.3 first because it is compatible with 18.2 but adds warnings for APIs that need attention before React 19.

```powershell
pnpm -r --filter '@velgrim/*' up react@18.3.1 react-dom@18.3.1 @types/react@18 @types/react-dom@18
pnpm -r --filter '@velgrim/*' test
```

Fix all warnings from:

- legacy `react-dom` rendering APIs
- `react-dom/test-utils` usage
- old JSX transform warnings
- any Strict Mode effect cleanup issues surfaced by tests

This phase should be a temporary checkpoint, not the final state.

### 4. Migrate `@velgrim/testing`

Do this package first because it owns shared Jest transforms and render helpers.

1. Replace React DOM legacy APIs:

   - import `act` from `react`, not `react-dom/test-utils`
   - replace `render` from `react-dom` with either `createRoot` from `react-dom/client` or `render` from `@testing-library/react`
   - replace `unmountComponentAtNode(container)` with `root.unmount()` or Testing Library's `unmount()`

2. Prefer Testing Library for public helpers:

   - keep `testJsx`, `testSnapshot`, and `testStylesViaSnapshot` on `@testing-library/react`
   - rewrite `testHook` and `testHookCycle` to use `renderHook` from `@testing-library/react` where possible
   - remove `@testing-library/react-hooks`; it is legacy and not a React 19 target

3. Update Jest:

   - `jest@30.4.2`
   - `babel-jest@30.4.1`
   - `jest-environment-jsdom@30.4.1`
   - `@types/jest@30.0.0`
   - remove `ts-jest` unless a real config uses it
   - change `@testing-library/jest-dom/extend-expect` references to the current `@testing-library/jest-dom` setup import if enabled

4. Update Babel and Emotion:

   - keep the automatic JSX runtime in `testing/.babelrc` and `testing/src/jest/babelTransform.ts`
   - update Babel packages to `7.29.7`
   - update Emotion packages to the latest stable versions listed above

5. Decide whether `@velgrim/testing` still needs Storybook dependencies.

   Current Storybook dependencies are old and use `next` prerelease tags. Do not keep that pattern. Storybook removal is preferred; retention requires a demonstrated consumer and a clear reason it belongs in this foundational testing package.

   Preferred path if Storybook is not used by this package:

   - remove Storybook dependencies from `@velgrim/testing`
   - remove `build-package:dev` and `build-package:prod` if they only support obsolete Storybook/webpack behavior

   Preferred path if Storybook is still required:

   - run the Storybook automigration through pnpm:

     ```powershell
     pnpm dlx storybook@10.4.2 upgrade
     ```

   - let the migration choose a coherent Storybook package set
   - remove `@storybook/addon-storyshots`; replace Storyshots coverage with Testing Library snapshot tests or a maintained Storybook test-runner flow
   - remove direct dependencies on internal Storybook packages such as `@storybook/addons`, `@storybook/api`, `@storybook/components`, `@storybook/core-events`, and `@storybook/theming` unless source imports prove they are still needed

### 5. Migrate `@velgrim/core`

1. Update React package surface:

   - `peerDependencies.react`: `^18.3.1 || ^19.0.0`
   - `peerDependencies.react-dom`: `^18.3.1 || ^19.0.0`
   - `devDependencies.react`: `19.2.7`
   - `devDependencies.react-dom`: `19.2.7`
   - `devDependencies.@types/react`: `19.2.16`
   - `devDependencies.@types/react-dom`: `19.2.3`

   These are infrastructure libraries and the current source does not appear React-19-specific, so preserving React 18.3 compatibility is preferred while still validating locally on React 19.

2. Remove `@types/react` and `@types/react-dom` from `resolutions`.

3. Update TypeScript config:

   - set `"jsx": "react-jsx"` for source compilation
   - decide whether the package remains CommonJS-only or moves to dual ESM/CJS output
   - if keeping CommonJS output, be careful with ESM-only latest dependencies

4. Replace `uuid`:

   - current `core/src/util/createUniqueId.ts` imports `v4` from `uuid`
   - latest `uuid@14.0.0` is ESM-first
   - simplest path: remove `uuid` and `@types/uuid`, and use `globalThis.crypto.randomUUID()` with a small fallback if this package must support older runtimes
   - if a dependency must remain, use `uuid@14.0.0` only after the package output strategy supports it

5. Re-run the repaired build and typecheck scripts before moving on.

### 6. Migrate `@velgrim/rxjs`

1. Update React package surface the same way as `@velgrim/core`, with preferred peer dependencies:

   - `peerDependencies.react`: `^18.3.1 || ^19.0.0`
   - `peerDependencies.react-dom`: `^18.3.1 || ^19.0.0`

2. Update internal dependency:

   - `@velgrim/core`: `workspace:^`

3. Update `rxjs` to `7.8.2`.

4. Audit subscription behavior under React 19:

   - `useSubscription` should always clean up subscriptions synchronously from the effect cleanup
   - verify dependency arrays for hooks that subscribe to `Subject` or `Observable`
   - add React StrictMode tests for mount, rerender, unmount, and remount behavior
   - validate double mount and double cleanup behavior in React 19 dev mode

5. Audit lifecycle hook choice for subscriptions:

   - evaluate whether `useEffect`, `useLayoutEffect`, or `useInsertionEffect` is the correct lifecycle for subscription management
   - document why the chosen hook is correct for observable subscription setup and cleanup
   - keep `useInsertionEffect` only if the audit proves it is required or clearly preferable

6. Investigate `useSyncExternalStore` explicitly:

   - evaluate observable-to-render bridges that currently depend on `useState`, `useSubscription`, or forced rerenders
   - determine whether `useSyncExternalStore` improves correctness, concurrent rendering safety, or subscription behavior
   - do not implement this blindly; document whether the existing model is sufficient or where replacement is justified

7. Validate the Fixture Manager critical path under React 19 and StrictMode:

   - `createEvents()`
   - `useEvent()`
   - `RxObservable.useState()`
   - `RxObservable.usePipe()`
   - `RxObservable.useMap()`
   - `RxTopic.patch()`
   - `RxEventsContext.useReducedState()`

8. Run package tests after `@velgrim/testing` passes because the Jest config depends on it.

### 7. Upgrade TypeScript 5.9 and defer TypeScript 6

1. Upgrade TypeScript to `5.9.3` for the React 19 migration.

2. Add a shared base TypeScript config at the repo root if repeated compiler settings stay aligned.

3. Keep TypeScript 6 as a future phase after React 19 is green.

   TypeScript 6 introduces another independent failure source. Do not combine it with the React 19, Jest 30, Testing Library 16, workspace, and build-pipeline migration.

4. Revisit module output after React 19 validation:

   Current configs use `"module": "commonjs"`. Latest stable versions of small packages such as `uuid@14` and `camelcase@9` are ESM-only. Choose one of these before final dependency updates:

   - publish dual ESM/CJS packages with explicit `exports`
   - publish ESM-only packages as a major release
   - keep CommonJS output and replace ESM-only dependencies with local helpers or platform APIs

   Decision after the shopping-cart Vite migration: defer `exports` until Fixture Manager consumes the migrated packages successfully. Preferred eventual direction is dual ESM/CJS, but do not implement it yet. The Vite example currently handles linked CommonJS packages with dependency prebundling.

5. Add package `exports` once output is defined:

   ```json
   {
     "main": "./dist/index.cjs",
     "module": "./dist/index.js",
     "types": "./dist/index.d.ts",
     "exports": {
       ".": {
         "types": "./dist/index.d.ts",
         "import": "./dist/index.js",
         "require": "./dist/index.cjs"
       }
     }
   }
   ```

### 8. Dependency cleanup rules

- Move shared tooling dependencies to the root workspace where practical.
- Keep runtime dependencies in each package only when required by published code.
- Keep React and React DOM as peer dependencies for published libraries.
- Use exact versions for dev tooling during the migration to avoid moving targets.
- Use semver ranges for peer dependencies.
- Replace `yarn` commands in scripts and docs with `pnpm`.
- Do not use `next` or prerelease dependency specifiers in package manifests.

Package-specific cleanup:

- `@velgrim/core`
  - remove `@types/uuid` if `uuid` is removed or upgraded to a version with bundled types
  - consider replacing `@use-it/event-listener`; latest is only `0.1.7`, so this may be better as local hook code if it is still used

- `@velgrim/rxjs`
  - remove `@types/uuid` if it is only present because of transitive or stale dependencies

- `@velgrim/testing`
  - replace `camelcase@5.3.1`; latest `camelcase@9.0.0` is ESM-only, and the current use in `fileTransform.ts` can be replaced with a tiny local PascalCase helper
  - remove `react-app-polyfill` unless Jest setup still needs old browser polyfills
  - remove `babel-preset-react-app` unless a current transform still imports it
  - remove `require-from-string` if unused
  - determine whether webpack is still required; remove it if package bundling is obsolete, and only then consider a webpack 5 migration if a real build consumer remains

## Validation checklist

Run these from the repo root after each phase:

```powershell
pnpm install --frozen-lockfile
pnpm --filter @velgrim/testing test
pnpm --filter @velgrim/core test
pnpm --filter @velgrim/rxjs test
pnpm -r --filter '@velgrim/*' typecheck
pnpm -r --filter '@velgrim/*' build
```

Add targeted tests before the React 19 final bump:

- `@velgrim/testing` tests for helper cleanup and unmount behavior
- `@velgrim/core` tests for `useUniqueId` / `createUniqueId` after removing or replacing `uuid`
- `@velgrim/rxjs` tests that subscriptions unsubscribe on rerender and unmount under React 19
- `@velgrim/rxjs` StrictMode tests for mount, rerender, unmount, and remount behavior
- `@velgrim/rxjs` Fixture Manager critical-path tests for `createEvents()`, `useEvent()`, `RxObservable.useState()`, `RxObservable.usePipe()`, `RxObservable.useMap()`, `RxTopic.patch()`, and `RxEventsContext.useReducedState()`
- a written lifecycle-hook audit for `useEffect` vs `useLayoutEffect` vs `useInsertionEffect` in subscription management
- a written `useSyncExternalStore` investigation outcome for observable-to-render bridging

Then run the final React 19 upgrade:

```powershell
pnpm -r --filter '@velgrim/*' up react@19.2.7 react-dom@19.2.7 @types/react@19.2.16 @types/react-dom@19.2.3
pnpm install
pnpm test
pnpm typecheck
pnpm build
```

## Example app follow-up

Completed after the packages passed on React 19.

- Package references were replaced with workspace packages while developing locally.
- React and React DOM were upgraded to `19.2.7`.
- The copied CRA/webpack 4 toolchain was replaced with Vite.
- The root pnpm lockfile was regenerated; no example-local lockfile is used.
- Vite dev prebundles `@velgrim/core` and `@velgrim/rxjs` so the linked CommonJS packages are consumed as dependencies.
- The example caught and drove a package fix: `@velgrim/core` `Environment` no longer requires a browser `process` shim at module load.
- Do not migrate to webpack 5 unless the example explicitly becomes a webpack compatibility target.

Next consumer follow-up:

- Use Fixture Manager as the next real consumer before changing package `exports` or runtime semantics.
- If Fixture Manager also needs bundler-specific handling for the current CommonJS output, decide whether to move package output to dual ESM/CJS with explicit `exports`.

## Future hardening follow-up

React 19 is closed. Defer a separate `@velgrim/rxjs` runtime semantics audit until Fixture Manager provides evidence that it is needed.

Focus areas:

- subscription topology
- store consistency
- concurrent rendering behavior
- selector behavior
- event lifecycle

Trigger evidence:

- normalized projection flow
- selector hooks
- patch flow

If those Fixture Manager paths surface render/subscription issues, evaluate `useSyncExternalStore`. Otherwise do not churn the runtime; the current implementation has survived React 19, StrictMode package tests, and a real browser consumer.

## Completion criteria

- One root `pnpm-lock.yaml` represents all packages.
- No package manifest uses Yarn-only fields or `next` dependency specifiers.
- `@velgrim/core` and `@velgrim/rxjs` peer dependencies prefer `^18.3.1 || ^19.0.0`.
- React type packages are on the React 19 line.
- TypeScript is upgraded only to the latest stable 5.x line for this migration; TypeScript 6 remains a separate follow-up.
- `@velgrim/testing` no longer imports `react-dom/test-utils`, `react-dom` `render`, or `unmountComponentAtNode`.
- `@velgrim/rxjs` has explicit subscription lifecycle coverage under React StrictMode.
- `@velgrim/rxjs` Fixture Manager critical-path APIs are validated under React 19 and StrictMode.
- `useInsertionEffect` has been evaluated against `useEffect` and `useLayoutEffect` for subscription lifecycle management, and the selected hook is documented.
- `useSyncExternalStore` has been evaluated and either adopted where justified or documented as unnecessary for the current model.
- Public APIs remain compatible unless a documented migration blocker requires a change.
- Webpack is removed unless a demonstrated package build consumer still requires it.
- `pnpm test`, `pnpm typecheck`, and `pnpm build` pass from the repo root.
- The example app runs against the migrated packages or is documented as a separate follow-up.

## References

- React 19 upgrade guide: https://react.dev/blog/2024/04/25/react-19-upgrade-guide
- React 19 release notes: https://react.dev/blog/2024/12/05/react-19
