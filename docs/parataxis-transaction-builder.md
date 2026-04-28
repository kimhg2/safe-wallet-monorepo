# Parataxis Transaction Builder notes

Last updated: 2026-04-28

## Summary

Transaction Builder is not a native screen in the wallet web app. The current Safe Wallet implementation opens it as an external Safe App inside the Safe Apps iframe flow.

This means a custom Parataxis wallet can support Transaction Builder, but only if the Transaction Builder app URL can be embedded by the Parataxis wallet domain and can communicate through the Safe Apps SDK.

## Current implementation

The web app resolves Transaction Builder from `apps/web/src/hooks/safe-apps/useTxBuilderApp.ts`:

```ts
const TX_BUILDER_URL = IS_PRODUCTION
  ? 'https://apps-portal.safe.global/tx-builder'
  : 'https://tx-builder.staging.5afe.dev'
```

The route opens `/apps/open` with `appUrl` set to that URL. From there, the Safe Apps iframe loads the external app and the wallet provides Safe Apps SDK communication.

## Why it may not work in a forked wallet

The wallet itself does not prevent Transaction Builder from working. The main blocker is whether the external Transaction Builder URL allows the Parataxis wallet origin to embed it in an iframe.

The staging Transaction Builder currently sends a restrictive CSP header:

```txt
frame-ancestors https://*.5afe.dev https://app.safe.global
```

That policy allows Safe-controlled domains, but does not allow arbitrary fork domains or local development origins. In that case the browser blocks iframe rendering before the wallet can use the app.

Adding the official Transaction Builder URL as a custom Safe App does not bypass this restriction. CSP is enforced by the browser from the embedded app's response headers.

## Production considerations

The production URL `https://apps-portal.safe.global/tx-builder/` currently responds without an obvious `frame-ancestors` restriction in the top-level HTML response, but it is still owned and operated by Safe. Its behavior can change independently from the Parataxis wallet.

For a branded wallet product, relying directly on Safe-hosted Transaction Builder creates operational risk:

- Safe can change CSP, routing, assets, manifest, or SDK behavior.
- Safe can restrict embedding to official hosts.
- The app remains visually and operationally outside Parataxis control.
- Staging and production behavior may differ.

## Recommended options

### Option 1: Self-host Transaction Builder

Fork or package the Transaction Builder Safe App and host it under a Parataxis-controlled domain, then point the wallet to that URL.

Recommended follow-up change:

- Add a `NEXT_PUBLIC_TX_BUILDER_URL` environment variable.
- Use the Parataxis-hosted URL in production and a local/dev URL in development.
- Keep the existing Safe URLs only as fallback values.

This keeps the current Safe Apps architecture while making the dependency controllable.

### Option 2: Ask Safe to allow the Parataxis domain

Ask Safe to include the Parataxis wallet origin in the Transaction Builder `frame-ancestors` policy.

This is the smallest code change, but the least reliable operationally because the app remains controlled by Safe.

### Option 3: Build native Transaction Builder UX

Implement Transaction Builder as a first-party wallet feature instead of loading an external Safe App.

This gives the most product control, but requires more implementation work:

- transaction form and validation
- ABI/function input handling
- batched transactions
- simulation/preview
- proposal flow integration
- tests for transaction construction and Safe execution paths

## Practical decision

For the Parataxis wallet, self-hosting Transaction Builder is the best short-term direction. It preserves compatibility with the existing Safe Apps SDK flow while avoiding iframe/CSP dependency on Safe-controlled domains.

Native Transaction Builder can be considered later if Parataxis needs deeper workflow control or a fully branded institutional transaction experience.
