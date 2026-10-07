# Native-language website reading

Visitors choose their language in the desktop globe menu or mobile navigation. The premium selector makes English the default, then offers four Indian languages (Hindi, Tamil, Telugu and Bengali) and six global languages (French, Spanish, German, Arabic, Simplified Chinese and Japanese), with native-script names. Arabic switches to RTL after translation succeeds. Previously configured locale URLs remain supported for compatibility.

Language URLs preserve the current page, for example /hi/company/careers or /ta/services. Internal navigation preserves the selected language. A preference cookie remembers the visitor’s choice; the English action restores the original site. The underlying Payload records are preserved in English.

## Translation providers

Selecting a language starts automatic public-page translation immediately. If GOOGLE_TRANSLATE_API_KEY is configured, the server uses Google Cloud Translation Basic. Otherwise it uses the public MyMemory translation API without an API key. Successful results are cached on disk and reused across visits. The free fallback is subject to MyMemory's daily quota and availability; use a configured Cloud provider for larger traffic volumes. Provider errors preserve English content and offer a retry action.

For Cloud Translation, enable the API in your Google Cloud project, configure billing/quota limits, restrict the key to the Translation API and your server where applicable, then set GOOGLE_TRANSLATE_API_KEY in .env (local) or .env.production (VPS). Do not use a NEXT_PUBLIC variable for this key. Restart the app after configuration. Test a full page, an Insights article, a published career role, the mobile menu, the quote steps, and Arabic/Urdu RTL against the real provider before launch.

References: [Google Basic translation API](https://docs.cloud.google.com/translate/docs/reference/rest/v2/translate), [supported languages](https://docs.cloud.google.com/translate/docs/languages), [MyMemory API](https://mymemory.translated.net/doc/spec.php), [MyMemory usage limits](https://mymemory.translated.net/doc/usagelimits.php).

## Content and privacy behavior

The reading layer translates public rendered copy, including published CMS content, and observes newly opened menus and quote steps. It keeps text as plain text. English content stays readable while translations load; provider failures keep the original content visible with an explicit status. This is automatic visitor-facing translation, not an editorially approved multilingual CMS or translated SEO metadata.

Only registered public UI strings and anonymously readable CMS content are allowed through the server endpoint. Quote values, enquiry review details, uploaded filenames, confirmation references, form input values and private CMS records are excluded. Native language options, logos, scripts, code and JSON-LD are excluded. No private uploaded document is sent to either provider.

The API key stays on the server. Translation batches and request size are bounded, the endpoint checks Origin, and requests are rate limited. Cached translations are stored by a content hash in .translation-cache locally or the translations volume in Docker. The application character limit is per process/day and resets on process restart; enforce real expenditure limits and quotas with the provider. Updating content creates a new cache entry. Review important legal and technical terminology with native-language editors.

Run node scripts/build-translation-catalog.mjs when adding new interface text. Published CMS content is refreshed into the public catalog every minute. New canonical language SEO pages and human-approved per-locale Payload publishing are separate editorial work; no hreflang claims are generated for unreviewed automatic output.

