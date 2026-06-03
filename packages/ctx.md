Status: React 19 migration and the `2.0.0` semver-major release are closed. The packages are published on npm.

Current context:
- Root workspace is `C:\agentic\Velgrim-React` with `packageManager: pnpm@11.5.1`, root `pnpm-workspace.yaml`, and one root `pnpm-lock.yaml`.
- Published npm `latest` now resolves to:
  - `@velgrim/testing@2.0.0`
  - `@velgrim/core@2.0.0`
  - `@velgrim/rxjs@2.0.0`
- `@velgrim/rxjs@2.0.0` published with `@velgrim/core: ^2.0.0` and `rxjs: 7.8.2`.
- All three packages support React peer range `^18.3.1 || ^19.0.0`, use TypeScript 5.9.3, Jest 30, and `jsx: react-jsx`.
- `examples/shopping-cart` remains the first validated real consumer: Vite 8, React 19, workspace dependencies on `@velgrim/core` and `@velgrim/rxjs`, and dependency prebundling for linked CommonJS workspace packages.
- `@velgrim/core` no longer assumes a Node `process` global during `Environment` module evaluation, so browser consumers do not need a `process.env` bundler shim.

Validation passed immediately before publish:
- `pnpm dlx pnpm@11.5.1 install --frozen-lockfile`
- `pnpm dlx pnpm@11.5.1 test`
- `pnpm dlx pnpm@11.5.1 typecheck`
- `pnpm dlx pnpm@11.5.1 build`
- `pnpm dlx pnpm@11.5.1 --filter "@velgrim/testing" pack --dry-run`
- `pnpm dlx pnpm@11.5.1 --filter "@velgrim/core" pack --dry-run`
- `pnpm dlx pnpm@11.5.1 --filter "@velgrim/rxjs" pack --dry-run`

Publish completed:
- `pnpm dlx pnpm@11.5.1 publish --access public` from `packages/testing`
- `pnpm dlx pnpm@11.5.1 publish --access public` from `packages/core`
- `pnpm dlx pnpm@11.5.1 publish --access public` from `packages/rxjs`
- Registry verification after publish returned `2.0.0` for all three package `latest` versions.

No evidence currently justifies:
- Dual ESM/CJS migration.
- Package `exports` modernization.
- `useSyncExternalStore` migration.

Next:
- Use Fixture Manager as the next real consumer.
- Prefer consuming the published `2.0.0` packages first, because that validates actual npm package metadata and tarball behavior beyond the workspace.
- Keep workspace links only for local iteration after the published-package smoke is known.
- Keep package output modernization deferred until Fixture Manager shows actual consumer friction.

High-leverage decisions:
- Whether Fixture Manager should start by installing published `2.0.0` packages or by using local workspace links. Published packages are the better first proof unless active library edits are expected.
- Whether Fixture Manager exposes bundler friction with the current CommonJS output. That evidence should decide dual ESM/CJS plus explicit `exports`.
- Whether Fixture Manager exposes render/subscription issues in normalized projection, selector hooks, or patch flow. That evidence should decide whether to evaluate `useSyncExternalStore`.
