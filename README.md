# EPUBTRANS V2

An editorial publishing and localization website using Next.js, React, TypeScript, Payload CMS and PostgreSQL.

## Local development

Use Node 22 and npm. Copy `.env.example` to `.env` and configure a PostgreSQL connection, a strong Payload secret and the local server URL. Keep secrets out of Git.

```sh
npm ci
npm run payload -- migrate
npm run dev -- --port 3001
```

The existing development database already has the baseline and additive enterprise migration applied. Do not seed or re-adopt it. The legacy template seed route is disabled.

## Checks

```sh
npm run typecheck
npm run lint
npm run test:int
npm run test:e2e
npm run build
```

Browser tests use the installed Microsoft Edge channel on this Windows machine. For Linux CI install a Playwright browser and adjust the channel in playwright.config.ts. End-to-end tests need a disposable development database; they create a uniquely identified admin and synthetic quote fixtures. Remove synthetic enquiries with `node --import tsx/esm scripts/cleanup-qa.ts` after testing.

## Editing and deployment

Content editors use `/admin`. A published `home` Page replaces the curated homepage through the block composer. Services, solutions and industries retain the existing content; additional collections support technology, resources, careers and permission-approved case studies. Site Settings controls contact information. Quote submissions are stored privately without email notifications.

See [build audit](docs/BUILD-AUDIT.md), [phase tracker](docs/PHASES.md), [validation and remaining work](docs/VALIDATION.md), and [manual VPS deployment](docs/DEPLOYMENT.md).

Use package-lock.json and npm for this implementation. The pre-existing pnpm lockfile is retained for history and is not the deployment lockfile.
