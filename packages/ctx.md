Status: React 19 migration closed; release-prep version bump completed; npm publish is blocked by missing npm auth on this machine.

Current context:
- Root pnpm workspace is `C:\agentic\Velgrim-React` with `packageManager: pnpm@11.5.1`, one root `pnpm-lock.yaml`, and packages/examples included by `pnpm-workspace.yaml`.
- `@velgrim/testing`, `@velgrim/core`, and `@velgrim/rxjs` are migrated and validated for React 19 with React peer range `^18.3.1 || ^19.0.0`, TypeScript 5.9.3, Jest 30, and `jsx: react-jsx`.
- Package manifests have been bumped for the planned semver-major release:
  - `@velgrim/testing@2.0.0`
  - `@velgrim/core@2.0.0`
  - `@velgrim/rxjs@2.0.0`
- Registry checks still show only the old published versions: `@velgrim/testing` through `1.1.1`, `@velgrim/core` through `1.1.2`, and `@velgrim/rxjs` through `1.1.5`.
- `npm whoami` fails with `ENEEDAUTH`, so the packages have not been published from this machine.
- `pnpm pack --dry-run` for all three packages confirmed the tarballs include built `dist` outputs.
- `examples/shopping-cart` remains migrated to Vite 8 with React 19, workspace dependencies on `@velgrim/core` and `@velgrim/rxjs`, and Vite dependency prebundling for the linked CommonJS workspace packages.
- `@velgrim/core` no longer assumes a Node `process` global during `Environment` module evaluation, so browser consumers do not need a `process.env` bundler shim.

Validation passed after the version bump:
- `pnpm dlx pnpm@11.5.1 install --lockfile-only`
- `pnpm dlx pnpm@11.5.1 install --frozen-lockfile`
- `pnpm dlx pnpm@11.5.1 test`
- `pnpm dlx pnpm@11.5.1 typecheck`
- `pnpm dlx pnpm@11.5.1 build`
- `pnpm dlx pnpm@11.5.1 --filter @velgrim/testing pack --dry-run`
- `pnpm dlx pnpm@11.5.1 --filter @velgrim/core pack --dry-run`
- `pnpm dlx pnpm@11.5.1 --filter @velgrim/rxjs pack --dry-run`

No evidence currently justifies:
- Dual ESM/CJS migration.
- Package `exports` modernization.
- `useSyncExternalStore` migration.

Next:
- Commit and push the `2.0.0` release-prep version bump.
- Log into npm or provide publish credentials, then publish in order: `@velgrim/testing`, `@velgrim/core`, `@velgrim/rxjs`.
- After publish, use Fixture Manager as the next real consumer to prove the React 19 package surface and package-consumption behavior beyond the shopping-cart smoke.
- Keep package output modernization deferred until Fixture Manager confirms actual consumer friction.

High-leverage decisions:
- Whether to authenticate this machine for npm publishing now, or publish from another trusted release environment.
- Package output remains evidence-triggered: Vite can consume the current CommonJS packages with prebundling, and Fixture Manager should decide whether dual ESM/CJS with explicit `exports` is actually needed.
- The RxJS runtime audit remains evidence-triggered: the current implementation survived React 19, StrictMode package tests, and a real browser consumer. Evaluate `useSyncExternalStore` only if Fixture Manager's normalized projection, selector hooks, or patch flow surfaces render/subscription issues.
