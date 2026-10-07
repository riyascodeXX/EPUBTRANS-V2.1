#!/bin/sh
set -eu
# Run from the repository root on the VPS, after configuring .env.production.
backup_directory="${1:-./backups}"
mkdir -p "$backup_directory"
chmod 700 "$backup_directory"
backup_stamp=$(date -u +%Y%m%dT%H%M%SZ)
umask 077
docker compose --env-file .env.production exec -T postgres sh -c 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" -Fc' > "$backup_directory/database-$backup_stamp.dump"
docker compose --env-file .env.production exec -T app tar czf - -C /app public/media private-uploads > "$backup_directory/files-$backup_stamp.tar.gz"
printf '%s\n' "Backup created: $backup_stamp"
