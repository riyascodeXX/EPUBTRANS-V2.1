# EPUBTRANS V2 BUILD AUDIT

Audit date: 7 October 2026. Repository: D:/projects/co/epubtrans-v2.

## 1. Existing stack
Next.js 16.3.3, React 19.2.6, TypeScript 5.7.3, Tailwind 4.1, Payload 3.90.2, PostgreSQL adapter, Geist fonts, Lucide, Playwright and Vitest. Node 20.20.0; npm lockfile and pnpm lockfile present. Preserve npm's existing installed environment. Add an explicit typecheck script.

## 2–5. Architecture, tree, routes and components
App Router with separate (frontend) and (payload) root layouts. Payload admin, REST, GraphQL, live preview, SEO, redirects, form builder and search plugins are available.

```
src/app/(frontend)/       home, [slug], services/[slug], solutions/[slug],
                         industries/[slug], posts/[slug], posts/page/[pageNumber],
                         search, next/preview, next/exit-preview, next/seed, XML sitemaps
src/app/(payload)/        admin/[[...segments]], api/[...slug], api/graphql
src/components/          navigation, shared, home, UI, RichText, Media,
                         CollectionArchive, forms through existing blocks
src/config/              site, navigation, languages, design-system
src/payload/collections/  services, solutions, Industries
src/collections/         Pages, Posts, Media, Categories, Users
src/Header, src/Footer   template globals and alternate header/footer implementations
src/blocks/              Content, CTA, Archive, Form, Media, Banner, Code
src/utilities/           CMS reads, metadata, redirects, preview, media, industries
scripts/                 industry seed and verification
public/                  favicon.jpeg, favicon.ico, favicon.svg, map.jpg, template OG
```
Technology, Insights, Company and Get a Quote have navigation links but no dedicated routes. The generic [slug] route can only serve CMS pages. Database has zero Pages; these links currently cannot fulfill their intended journey.

## 6–7. Header and mobile navigation
Custom navigation is mounted globally. Desktop services menu relies on CSS hover, with no robust expanded state, Escape or click handling. Mobile has a panel but language control is inert. Footer exists but is not mounted in the root layout. Navigation uses hardcoded colors and rounded geometry. Rebuild with native disclosure buttons, full-width mega navigation, fullscreen mobile dialog, nested disclosures, focus containment/restoration, Escape, outside dismissal and scroll lock. Preserve final six labels and EN; activate English only.

## 8–10. Payload collections, globals and real content
Collections: Users, Media, Pages, Posts, Categories, Services, Solutions, Industries plus plugin-generated forms, form-submissions, redirects and search.
Globals: Header, Footer. No SiteSettings.
Read audit of local database: 16 services (13 published, 3 draft: accessibility, proofreading, subtitling); 1 published solution (digital-publishing); 0 industries, pages, posts or media. Static service pages currently ignore CMS and expose content independently of publication state. Local image artifacts and an industry seed script exist; they do not demonstrate current DB content. Never run destructive template seeding.

## 11. Keep
KEEP Next/Payload integration, Postgres, auth, Lexical, media pipeline, SEO plugin, redirect plugin, preview, shared utilities, installed fonts, existing records, industry schema and user changes.
REFACTOR CMS readers, access controls, service/solution templates, globals and blocks, sitemap and metadata, grid and button components.
REBUILD homepage, custom navigation, footer, quote journey and absent top-level routes. Existing homepage is a long client component with gradients, floating shapes, numerous continuous animations and replicated content.
REMOVE from active experience template branding and template OG, inert controls and unverified claims. Preserve source/data rather than bulk deleting.

## 12. Technical problems
- Services/Solutions public read is unconditional; custom collections omit authenticated write controls.
- Local API reads must set overrideAccess: false for public routes.
- Development adapter schema push is enabled by default. Use explicit migrations for existing data.
- Docker Compose uses Node 18 and MongoDB despite the current PostgreSQL app.
- Dockerfile assumes standalone output, currently absent. No Nginx configuration.
- No typecheck script. Existing tests largely target template behavior.
- SEO default still says Payload Website Template.
- No configured email adapter; quote acknowledgment must not pretend an email was sent.
- Existing uncommitted work is extensive. Preserve it; save overwritten source snapshots.

## 13. EPUBTRANS V1 inventory
Sources: [home](https://www.epubtrans.com/), [company](https://www.epubtrans.com/about-us), [portfolio](https://www.epubtrans.com/portfolio), individual service URLs below.
Verified services: cover design, copyediting, proofreading, typesetting, data conversion, SciELO XML markup, indexing, graphics/images, eBook creation, translation, desktop publishing, eLearning localization, subtitling, voiceover, transcription, accessibility.
Portfolio presents examples by eLearning, EPUB, DTP and typesetting. These are work samples, not outcome case studies. Do not invent clients, metrics or endorsements.
Homepage and company page identify EPUBTRANS as a technology-based publishing company. Phone +91 44 3136 3907 and email info@epubtrans.com recur. Postal addresses differ between home/company and copyediting; omit street address until owner confirms. Certification wording exists on V1 copyediting but current status is not independently established; do not feature a badge.
The /blogs link returns 404. No verified articles available to migrate. Insights should show a meaningful empty state until approved posts exist. AI translation, machine translation, security certifications and partnerships are not established by the audit.

## 14. Accenture experience observations
Source: [current reference](https://www.accenture.com/en), inspected in browser and through public content.
Observed: black base, oversized headline, cinematic hero with pause, editorial tiles with category labels and expandable content, Services button expands a wide dark menu with simple text columns and a large overview link, restrained arrows, industry grouping, client spotlight, recognition, careers and structured legal footer. Header uses explicit expandable controls rather than hover alone. Initial media rendering briefly appeared black in the inspection; avoid relying on video loading for EPUBTRANS content visibility.
Translate qualities, not layout/assets: confident type, strong section contrast, generous gutters, simple text navigation and layered editorial hierarchy. Do not reuse their purple, logo, imagery, claims or page composition. Mobile behavior and motion timings are design proposals until directly tested; do not describe inferred behavior as observation.

## 15. V1 → V2 URL/content migration
| V1 | V2 | Action |
|---|---|---|
| / | / | Rebuild using verified capability wording |
| /about-us | /company | 301; editorial company narrative |
| /contact-us | /get-a-quote | 301; structured project request |
| /portfolio | /work | 301; verified sample categories, no fabricated cases |
| /blogs | /insights | 301; empty until approved content |
| /cover-page-design-services | /services/cover-page-design | 301 |
| /copyediting-services | /services/copyediting | 301 |
| /proofreading-services | /services/proofreading | 301; CMS draft gate |
| /typesetting-services | /services/typesetting | 301 |
| /data-conversion-services | /services/data-conversion | 301 |
| /scielo-xml-markup-services | /services/scielo-xml-markup | 301 |
| /indexing-services | /services/indexing | 301 |
| /graphic-design-image-services | /services/graphic-design-image-services | 301 |
| /ebook-creation-services | /services/ebook-creation | 301 |
| /translation-services | /services/translation | 301 |
| /desktop-publishing-services | /services/desktop-publishing | 301 |
| /elearning-localization-services | /services/elearning-localization | 301 |
| /subtitling-services | /services/subtitling | 301; CMS draft gate |
| /voiceover-services | /services/voiceover | 301 |
| /transcription-services | /services/transcription | 301 |
| /accessibility-services | /services/accessibility | 301; CMS draft gate |

Validate destination publication before go-live. Keep draft services unpublished; redirects to drafts remain release blockers until an approved destination is available. Next permanent redirects are 308; implement requested 301 in proxy and Nginx explicitly.

## 16. Current V2 → target
| Current | Target | Action |
|---|---|---|
| animated client homepage | server editorial homepage | rebuild |
| hover dropdown | accessible full-width disclosure | rebuild and test before homepage |
| static services | published CMS records | refactor |
| hardcoded solutions | published CMS records | refactor |
| unpopulated industry collection | content-aware explorer | keep schema; honest empty state |
| template globals | enterprise blocks/settings | add without destroying existing fields |
| missing conversion route | validated persisted quote | build private collection and server endpoint |
| Mongo Docker | Next/Payload/Postgres/Nginx | rebuild deployment files |

## 17. Proposed final architecture/design
Original identity: ink #102b2b, paper #f4f2eb, teal #006d68, mint #c6e6dc, white. Geist Sans headings/body, Geist Mono labels, editorial serif accents. Semantic color tokens; spacing 4/8/12/16/24/32/48/64/80/96/120/160/200; fluid display/H1/H2, 12/8/4 columns; logical properties for future RTL. Sharp buttons, fine rules, multilingual typography/page motifs. Descriptive hero copy grounded in V1; proposed creative headline stays in preview until owner editorial approval. No quantified business or performance claims.

Retain src structure; add src/styles, src/components/motion, src/components/editorial, src/components/forms, src/lib/content, src/lib/validation, src/payload/blocks, src/payload/globals, deployment/. Register ServiceCategories, Technologies, CaseStudies, Resources, Careers, QuoteRequests and SiteSettings with authenticated writes and published public reads. Keep Header/Footer fields for compatibility. Pages gain Hero, EditorialHero, RichContent, MediaText, FullWidthMedia, Statement, ServiceExplorer, SolutionGrid, IndustryExplorer, Stats, Quote, CaseStudies, Insights, LogoWall, Timeline, FAQ, CTA. Stats/trust/cases only render CMS-approved records. English only; future locales documented with RTL-safe styling.

Navigation: sticky light header, teal text, active route indicator; click/keyboard disclosures with focus and hover affordances; fullscreen mobile dialog, category details, Escape, route-close, scroll lock; EN opens an honest English-only language panel. No inactive translation switches.

## 18. Implementation phases
Follow requested phases 1–36 in order. Audit → content/URL architecture → tokens/type/grid/motion → header/desktop/mega/mobile → NAVIGATION TEST GATE → footer/hero/home → CMS → service/solution/industry/technology/insight/company/quote → i18n/SEO/accessibility/performance → responsive QA/automated tests → 301 map → Docker/Nginx → production deployment.
At each implementation checkpoint run typecheck, lint, build and relevant tests. Record actual results in docs/VALIDATION.md. Deployment needs a specified VPS, access, domain/DNS and certificates; prepare reviewable deployment artifacts first. Do not claim production deployment without evidence.
