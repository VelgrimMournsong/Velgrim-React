# Subscription lifecycle audit

`useSubscription` now uses `useLayoutEffect` for RxJS subscriptions.

`useInsertionEffect` was rejected for subscription setup because React reserves it for CSS-in-JS insertion work. Observable subscriptions can synchronously emit values during setup, and those callbacks may update React state. That behavior is not a valid use of `useInsertionEffect` in React 19.

`useEffect` was also rejected as the default lifecycle because this package supports event dispatch from passive effects. If a sibling component dispatches from `useEffect`, subscribers mounted later in the tree can miss the event when subscription setup is also passive.

`useLayoutEffect` preserves the important timing guarantee: subscriptions are established before passive effects run, cleanup is synchronous before dependency changes and unmounts, and synchronous observable emissions are allowed to update state.

## `useSyncExternalStore` outcome

The current APIs are event and observable bridges, not a single external store contract. `RxObservable.useState()` stores the last emitted value and rerenders on subscription callbacks, while `useSubscription()` is a side-effect subscription API. `useSyncExternalStore` is not a drop-in replacement for the subscription side-effect API.

`useSyncExternalStore` remains a good candidate for a future focused rewrite of `RxObservable.useState()` once the package defines explicit snapshot semantics per observable. It was not adopted in this migration because the React 19 blocker is lifecycle correctness, and changing the store model would expand the public behavior surface.
