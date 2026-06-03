Status: React 19 migration closed; Velgrim React infrastructure is now in maintenance / consumer-validation mode.

Current context:
- Root pnpm workspace remains at `C:\agentic\Velgrim-React` with `packageManager: pnpm@11.5.1`, one root `pnpm-lock.yaml`, and packages/examples included by `pnpm-workspace.yaml`.
- `@velgrim/testing`, `@velgrim/core`, and `@velgrim/rxjs` remain on React 19 dev dependencies/types, React peer range `^18.3.1 || ^19.0.0`, TypeScript 5.9.3, Jest 30, and `jsx: react-jsx`.
- `examples/shopping-cart` was migrated from copied CRA/webpack 4 tooling to Vite 8 with React 19, workspace dependencies on `@velgrim/core` and `@velgrim/rxjs`, Vite dependency prebundling for the linked CommonJS workspace packages, and no package-local lockfile.
- The obsolete `examples/shopping-cart/config` and `scripts/start.js` webpack stack was removed; the example now uses root `index.html`, `vite.config.ts`, `pnpm --filter shopping-cart start`, and `pnpm --filter shopping-cart build`.
- Browser smoke testing at `http://127.0.0.1:3001/` caught two real package-consumption issues: Vite dev needed dependency prebundling for linked CJS packages, and `@velgrim/core` assumed a Node `process` global.
- `@velgrim/core` `Environment` now reads through a guarded environment object so browser consumers do not need a `process.env` bundler shim, with regression coverage for loading without `globalThis.process`.
- Shopping-cart runtime smoke passed after the fixes: initial render had no fresh console errors, and clicking `Add to cart` updated the cart and total through the RxJS event flow.

Shopping-cart validated:
- React 19 runtime compatibility.
- Browser consumption.
- Workspace package consumption.
- Vite consumption.
- `@velgrim/core` and `@velgrim/rxjs` consumption together in a real app.

Known consumer issue discovered:
- `@velgrim/core` had a `process.env` module-load assumption that package tests missed and Vite/browser consumption exposed. This is fixed.

No evidence currently justifies:
- Dual ESM/CJS migration.
- Package `exports` modernization.
- `useSyncExternalStore` migration.

Validation passed:
- `pnpm dlx pnpm@11.5.1 install --frozen-lockfile`
- `pnpm dlx pnpm@11.5.1 test`
- `pnpm dlx pnpm@11.5.1 typecheck`
- `pnpm dlx pnpm@11.5.1 build`
- `pnpm dlx pnpm@11.5.1 --filter shopping-cart typecheck`
- `pnpm dlx pnpm@11.5.1 --filter shopping-cart build`
- Browser smoke on `http://127.0.0.1:3001/`: heading/buttons rendered, no fresh console errors, add-to-cart updated cart state and total.

Next:
- Do not continue execution from the plan until the next explicit instruction.
- Use Fixture Manager as the next real consumer to prove the React 19 package surface and package-consumption behavior beyond the shopping-cart smoke.
- Keep package output modernization deferred until Fixture Manager confirms actual consumer friction.

High-leverage decisions:
- Package output remains an evidence-triggered decision: Vite can consume the current CommonJS packages with prebundling, and Fixture Manager should decide whether dual ESM/CJS with explicit `exports` is actually needed.
- The RxJS runtime audit remains evidence-triggered: the current implementation survived React 19, StrictMode package tests, and a real browser consumer. Evaluate `useSyncExternalStore` only if Fixture Manager's normalized projection, selector hooks, or patch flow surfaces render/subscription issues.
