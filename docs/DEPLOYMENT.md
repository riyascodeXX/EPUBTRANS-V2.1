# Manual VPS deployment

The user elected to deploy manually. No production server or DNS was changed. Use npm and package-lock.json for this implementation.

The stack is Nginx → Next.js/Payload → PostgreSQL 17. PostgreSQL and the app have no published host ports. Media and quote files persist in separate named volumes; quote files are not under public/. PostgreSQL auto schema push is disabled.

## Before public launch

Review the proposed EPUBTRANS wordmark treatment and homepage headline, approved legal/privacy text and actual file retention policy. Publish or redirect the three draft service destinations (accessibility, proofreading, subtitling) before switching V1 traffic. Confirm the postal address; V1 pages disagree. Review remaining dependency advisories in artifacts/v2/dependency-audit-final.json. The release must not be represented as independently WCAG certified or security audited. Email notifications are not configured: saved requests appear in Payload admin.

Docker Compose syntax and a database-independent production build were validated locally. The Docker daemon was unavailable, so the image, container migration, TLS and Nginx have not been executed here. Run the verification steps below on your VPS before directing public traffic.

## Fresh server

1. Install Docker Engine with Compose on the VPS, copy this project, and point your domain’s DNS to the VPS. Allow HTTPS/HTTP and your SSH port through the host firewall.
2. Copy deployment/.env.production.example to .env.production. Set SITE_HOST to the hostname and NEXT_PUBLIC_SERVER_URL to its exact HTTPS origin. Generate distinct secrets with `openssl rand -hex 32`. Use a hex database password so the database URL is valid. Restrict .env.production to the deploying user (`chmod 600 .env.production`).
3. Obtain a real TLS certificate for the hostname. The Compose file mounts /etc/letsencrypt and Nginx expects live/DOMAIN/fullchain.pem and privkey.pem. For an initial certificate, a standalone ACME client can use port 80 while Nginx is stopped. Configure certificate renewal and reload Nginx after renewal.
4. Run these commands from the project root:

```sh
docker compose --env-file .env.production config --quiet
docker compose --env-file .env.production build app
docker compose --env-file .env.production up -d postgres
docker compose --env-file .env.production run --rm migrate
docker compose --env-file .env.production up -d app
```

5. Create the first admin before opening Nginx to public traffic. The script refuses to alter existing administrators. Set ADMIN_EMAIL and read a strong password without displaying it:

```sh
export ADMIN_EMAIL=your-admin-email
read -r -s -p 'Admin password: ' ADMIN_PASSWORD
export ADMIN_PASSWORD
docker compose --env-file .env.production exec -e ADMIN_EMAIL -e ADMIN_PASSWORD app node --import tsx/esm scripts/create-admin.ts
unset ADMIN_PASSWORD
docker compose --env-file .env.production up -d nginx
```

6. Verify:

```sh
docker compose --env-file .env.production ps
docker compose --env-file .env.production exec nginx nginx -t
docker compose --env-file .env.production logs --tail=100 app nginx
curl -fsS https://YOUR-DOMAIN/api/health
curl -I https://YOUR-DOMAIN/copyediting-services
```

Expect healthy containers, a 200 health response, HTTPS and a 301 to /services/copyediting. Test navigation, a quote request, anonymous quote denial, media upload and mobile layouts against the real domain. Check pages-sitemap.xml, posts-sitemap.xml, robots.txt and canonical URLs.

7. Open /admin. Publish content using the preserved Services, Solutions and Industries collections, the additional Technologies, CaseStudies, Resources and Careers collections, and the Pages block composer. See CMS-EDITING.md for publishing guidance. A published Page with slug `home` and layout blocks replaces the curated homepage composition. No destructive template seed is required. The legacy template seed endpoint is disabled (410).

## Existing local database and migrations

The original database was developed using Payload schema push. This session captured its schema in the baseline migration, then applied an additive enterprise migration in a transaction after a local private backup. Existing content was preserved. Both migrations are recorded in the local database history. A new database runs baseline then enterprise normally.

scripts/adopt-local-baseline.mjs is only for this exact pre-migration local schema and refuses remote hosts. Do not run it on a production DB. For an existing production DB, compare its schema to the baseline and use a reviewed adoption plan. Do not run a baseline that creates tables against an unadopted existing database.

To move local content, use PostgreSQL’s pg_dump/pg_restore into a fresh destination and transfer media/private-upload volumes. Migration history must accompany the dump. Never use the template seed to migrate business content. The local .local-backups directory is private and excluded from Git/Docker; it is a JSON recovery snapshot, not a substitute for a full production SQL backup.

## Private quote file access

Authenticated administrators can download a quote attachment using `/api/quote-files/REQUEST_ID/FILENAME`, using the stored attachment path shown on the quote record. Anonymous access is denied. Files are served as attachment/octet-stream with no-store and nosniff. No uploaded document is extracted or executed. Deploy malware scanning if your operating workflow requires opening untrusted documents; none is represented as present.

## Operations

Run `sh deployment/backup.sh` from the project root. It creates a PostgreSQL custom-format dump and a media/private-file archive under backups/ with restricted permissions. Schedule it using your VPS scheduler and copy encrypted backups off-host. Verify restoration into a separate, empty PostgreSQL instance and restore the file archive into matching volumes before relying on the backups. Define retention and deletion rules with the business owner.

Container logs rotate at 10 MB × 3 for app/Nginx. Containers restart unless stopped. /api/health verifies database connectivity. Nginx rate limits quote and login routes; the Node quote guard is per-process and is supplementary. Do not expose the app directly while TRUST_NGINX_PROXY=true: Nginx overwrites the trusted IP header. No quote confirmation email is sent; add a Payload email adapter and test delivery if notifications are needed.

For an update: create a backup, build the next image, run reviewed forward migrations, restart app/Nginx and verify health. Keep the previous image tag for code rollback. Do not automatically run destructive down migrations; restore to a separate database first when a data rollback is required.


## Native-language reading

See LANGUAGES.md. Automatic translation uses MyMemory without an API key; configure GOOGLE_TRANSLATE_API_KEY for Google Cloud Translation and higher traffic volumes. Allow outbound HTTPS to api.mymemory.translated.net or translation.googleapis.com as appropriate. PostgreSQL stays on the internal network and neither app nor database publishes a host port. Translations persist in a separate volume; the cache can be rebuilt and is not a business-data backup.

## AI assistant

Set GEMINI_API_KEY in the server environment (.env locally or .env.production for Compose), then restart the app. Keep this key server-side; never use a NEXT_PUBLIC_ variable for it. GEMINI_ASSISTANT_MODEL defaults to gemini-3.5-flash-lite. The assistant sends the recent conversation to the Gemini API and streams replies into the existing chat panel. The key's project must have access and available quota for the selected model.

The endpoint limits message size, concurrent replies and requests per minute. ASSISTANT_DAILY_REQUEST_LIMIT defaults to 300 requests per process per UTC day; these in-memory counters reset on restart. Allow outbound HTTPS to generativelanguage.googleapis.com. Without a key or when the provider fails, visitors receive an honest availability message and can retry or contact the team. The app does not persist transcripts; Google's data-use and retention policies apply to provider requests.
