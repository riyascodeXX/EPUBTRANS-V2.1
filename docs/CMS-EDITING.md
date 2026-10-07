# CMS editing guide

Open /admin with an authorized account. The first production administrator is created through the bootstrap steps in DEPLOYMENT.md before Nginx exposes the site.

## Homepage and pages

The curated homepage appears until a published Page with slug home has layout blocks. Compose a home Page using Enterprise Hero or Editorial Hero, Statement, Media Text, Service Explorer, Solution Grid, Industry Explorer, Case Studies, Insights, Timeline, FAQ and Enterprise CTA. Rich Content and Full Width Media support editorial sections. Publish the Page when approved; draft preview is available to authenticated editors through the preview action.

Avoid adding multiple H1 hero blocks to one Page. Provide descriptive text for meaningful images. Media requires alt text. Keep long copy in rich content and use short descriptive CTA labels. Block links accept local paths or HTTPS URLs.

## Publication and evidence

Services, Solutions, Industries, Technologies, Resources and Careers expose published records only. Drafts remain private. Posts appear under /resources with search, article categories and pagination. Published resources appear in the Resources hub's guides and downloads section, alongside practical project checklists. Existing /insights links redirect to /resources. Categories come from the Categories collection.

Case Studies require both published status and confirmed permission for public access. Stats render only with an evidence source and verification; quotes need permission and a source; logo-wall items need permission. Record the actual evidence and editorial approval rather than treating the checkboxes as a substitute for review.

Site Settings controls footer email, telephone and location. Header/Footer legacy globals are retained for compatibility; the six primary navigation labels are intentionally locked in src/config/navigation.ts. The menu checks service publication and routes unpublished service links to category context.

## Enquiries

Quote Requests is private. Review the saved contact/project details and attached filename/path. Download an attachment through /api/quote-files/REQUEST_ID/FILENAME while signed in. Define retention and deletion policies with the business owner. No email notification is sent automatically.

## Before publishing the business launch

Approve legal text, proposed brand/copy, the postal address and the three draft V1 service destinations. Publish only real articles, roles and authorized cases. Do not run a template seed: the public seed endpoint is deliberately disabled.

Native-language reading is configured through the globe/mobile selector. See LANGUAGES.md for the required translation key, protected enquiry values and cache behavior. Automatic translations do not replace approved English CMS records.
