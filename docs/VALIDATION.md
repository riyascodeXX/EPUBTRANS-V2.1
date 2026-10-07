# Validation and handoff

## Implemented

The EPUBTRANS V2 website now has an original editorial homepage, semantic design tokens, fluid typography, responsive layouts, accessible desktop/mobile navigation, a site footer, reusable motion primitives and content-driven routes. Existing business records were preserved. New CMS collections and 17 editorial block types were added through a reviewed additive migration.

The quote journey validates each step, preserves values when moving back, handles optional documents, requests consent and reports success only after the enquiry is saved. Public collection writes and enquiry reads are denied. Attachments are outside the public directory, bounded by size and type, and downloadable only by authenticated administrators. Email notifications are not configured.

A published home Page can replace the curated homepage. Authenticated draft preview works through the existing Payload preview endpoint; public routes enforce publication status. The template seed endpoint now returns 410 to protect business content.

## Verification evidence

- TypeScript: `npm run typecheck` passed.
- ESLint: `npm run lint` passed with zero errors and zero warnings.
- Production compilation: `npm run build` passed on Next 16.3.6, including a build with an intentionally unreachable PostgreSQL connection. There are no build-time content queries; CMS content loads at runtime.
- Integration tests: 3 passed, covering public publication filtering, private enquiry denial and quote validation.
- Browser tests: navigation, responsive rendering, quote submission/upload rules, REST access denial, admin login/editor and CMS publication gate passed. The final full suite passed: 13 tests in 57.8 seconds (Microsoft Edge/Chromium, two workers).
- Automated accessibility: axe WCAG 2 A/AA, WCAG 2.1 AA and WCAG 2.2 AA rule sets passed on the homepage, services index and quote page at 390 and 1440 pixels. Keyboard tests cover the desktop disclosure, Escape, outside dismissal, mobile modal focus containment and focus return.
- Responsive homepage: 375, 390, 414, 480, 768, 820, 1024, 1280, 1440, 1600, 1920 and 2560 pixels; no horizontal overflow. Screenshots at representative sizes are in artifacts/v2/screens. Editorial route smoke checks verify successful responses, one H1 and absence of template titles. The mobile Insights filter is also tested.
- SEO: all 20 mapped V1 routes return 301; published sitemap contains live service destinations and excludes the three draft services. Health returns 200; anonymous private file access returns 401.
- Deployment configuration: `docker compose config --quiet` passed with non-sensitive validation values.
- Synthetic test enquiries/files were removed using the narrowly scoped cleanup script. Admin/page fixtures use unique identifiers and are deleted by their tests.

Automated accessibility checks do not establish full WCAG conformance. Manual screen-reader review, production Core Web Vitals, load testing and an independent security review were not performed. No production performance score or certification is claimed.

## Performance choices

Home and content queries render on the server. The hero is lightweight CSS typography/page art rather than a large photo or client animation bundle. Geist fonts are locally served by the font integration. Motion uses transform and opacity, respects reduced motion, and avoids hiding essential text. Content images use Next Image with responsive sizes, local media URLs, native lazy loading and 75-quality optimization. The app builds independently of the database; production health verifies the database at runtime.

## Dependency review

Next and its ESLint configuration were updated to 16.3.6, Sharp to 0.35.5, Vitest to 4.1.11, and Undici to 7.30.0 via a narrow override. The final npm audit reports 17 advisories: 0 critical, 10 high and 7 moderate. Detailed affected paths and available fixes are in artifacts/v2/dependency-audit-final.json. Do not describe the dependency tree as vulnerability-free. Review the remaining upstream/transitive advisories before public launch; no forced downgrade of Payload was applied.

## Content and launch requirements

- Review the proposed teal wordmark treatment and homepage editorial copy with the business owner. Existing supplied assets were retained.
- The original database has 13 published services and three drafts: accessibility, proofreading and subtitling. These drafts stay private; the new menu points to their category context. Their V1 redirect destinations need approved publication or an approved alternative before switching traffic.
- One existing solution is published. No approved industry records, articles, client cases, career roles or media were initially present. Empty states and verified capability context are used; the CMS is ready for approved additions.
- Privacy and terms are explicitly pending owner review and excluded from indexing. Confirm legal text, document retention, contact details and the postal address before launch.
- Statistics require evidence/verification. Client cases, quotations and logos require permission. Unsupported certifications, metrics and testimonials were not invented.
- The native-language selector offers English plus 10 Indian/global languages, route preservation and RTL reading. Automatic translation uses MyMemory without a key, or Google Cloud Translation when GOOGLE_TRANSLATE_API_KEY is configured. Live French translation and English restoration were verified on the Careers page. See LANGUAGES.md for provider quotas.
- Docker daemon unavailable locally: image execution, fresh-container migration, Nginx/TLS and backup restoration remain to be verified on the VPS. Follow DEPLOYMENT.md. No live server or DNS was changed.

## Preservation

The worktree had pre-existing uncommitted changes and custom content. No reset, destructive template seed or wholesale content replacement was run. A private local DB recovery snapshot and copies of original replaced UI files are excluded from Git and Docker. Existing legacy components remain where they may support pre-existing content; the new shell uses the enterprise navigation/footer.



## Careers and native-language update (7 October 2026)

The careers page now includes work disciplines, published openings, full CMS role content and a contact path for future opportunities. Careers is reachable from Company navigation and /careers redirects to /company/careers. No job openings or benefits were fabricated.

The language selector contains 11 choices: English, four Indian languages and six additional global languages. Previously supported locale URLs remain valid. Localized URLs and internal links preserve page context. Automatic public-copy translation uses a server-side Google Cloud Translation adapter with a key-free MyMemory fallback, content-hash cache, public-text allowlist, bounded batches and request guards. Quote inputs, enquiry review values, references and uploaded filenames are excluded. Nine targeted integration tests and two routing/security browser tests passed. Live French translation through the selector and English restoration were verified on the Careers page; the endpoint also excluded an unregistered private string. Other locales, client translation behavior, accessibility labels and Arabic RTL are covered with mocked translation responses, not a native-language accuracy review.

## Premium language selector refinement

The visible selector is now limited to English as the default, four Indian languages (Hindi, Tamil, Telugu, Bengali) and six global languages (French, Spanish, German, Arabic, Simplified Chinese, Japanese). Native-script buttons replace the basic dropdown. Paper/teal styling, editorial typography, selected checks, hover/focus states and a direct mobile language dialog align with the homepage. Existing locale URL support remains for compatibility. Desktop/mobile language-panel accessibility and route preservation tests passed; the live provider key requirement is unchanged.
