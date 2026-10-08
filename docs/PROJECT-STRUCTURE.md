# Project folder guide

## Application code

| Folder | What belongs here |
| --- | --- |
| `src/app/(frontend)` | Public pages, layouts, site APIs and sitemap routes. Folder names determine URLs. |
| `src/app/(payload)` | CMS admin routes and Payload APIs. The admin import map is generated. |
| `src/components` | UI grouped by purpose, including `navigation`, `forms`, `heroes`, `search`, `editorial`, `i18n`, `motion`, `shared` and `ui`. Component-specific styles can stay beside the component. |
| `src/blocks` | Existing content block schemas and their React renderers. |
| `src/config` | Shared navigation, language, contact and design configuration. |
| `src/lib` | Application logic: content queries, assistant, translation, SEO and quote validation. |
| `src/providers` | Theme and shared React context providers. |
| `src/styles` | Shared CSS and breakpoint values. Import `index.css` once in the frontend layout. |
| `src/types` | Handwritten shared application types. |
| `src/utilities` | Reusable helpers and React hooks. |

## CMS code

```text
src/payload/
├── access/          Read/write permission rules
├── blocks/          Enterprise content block schemas
├── collections/     All collection schemas and collection-specific hooks
├── endpoints/       Legacy seed endpoint and seed assets
├── fields/          Reusable fields, link factories and hero schema
├── globals/         Header, Footer and SiteSettings schemas
├── hooks/           Shared CMS lifecycle hooks
├── migrations/      Database migration source and snapshots
├── plugins/         CMS plugin registration
└── search/          Search indexing fields and synchronization hooks
```

`src/payload.config.ts` remains the CMS entry point. Its database adapter explicitly reads migrations from `src/payload/migrations`. `src/payload-types.ts` is generated; update collection schemas rather than editing generated types.

The Header and Footer globals retain their template renderers for compatibility. The active website navigation lives in `src/components/navigation`.

After changing CMS admin component paths, run `npm run generate:importmap`. Database migration filenames and contents are preserved; moving folders does not require running a migration or seeding content.

## Styles

`src/styles/index.css` loads shared CSS in this order:

1. `globals.css`: Tailwind and base rules.
2. `tokens.css`: Design tokens.
3. `enterprise.css`: Website component styles.
4. Assistant component styles.
5. `responsive.css`: Layout and mobile overrides.
6. `theme.css`: Light/dark controls and theme overrides.

`breakpoints.js` supplies the shared image-sizing breakpoint values. The shadcn configuration points to `src/styles/globals.css`.

## Supporting folders

| Folder | Purpose |
| --- | --- |
| `public` | Public images, fonts and downloadable assets. |
| `tests/e2e` | Browser checks for routes, navigation, themes and responsive layouts. |
| `tests/int` | Integration and application logic checks. |
| `scripts` | Development, QA, translation and database maintenance tools. |
| `docs` | Architecture, CMS editing, validation and deployment documentation. |
| `deployment`, `docker` | Deployment and container support files. |
| `artifacts` | QA screenshots and audit outputs. |

Framework and tool configuration files remain at the repository root so their tools can discover them. `.next`, `node_modules`, test reports, translation caches, private uploads and local backups are runtime or generated data, not application source.

Historical audit documents describe the structure at the time of the audit. Use this guide for the current paths.

## Adding files

Keep a route's page-specific code alongside its route. Put reusable UI in the relevant `src/components` folder, CMS schemas under `src/payload`, application logic in `src/lib`, and shared styles in `src/styles`. Prefer `@/` imports when crossing feature folders; keep short relative imports within a feature.
