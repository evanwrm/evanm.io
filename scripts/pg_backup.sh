#!/bin/sh
set -e

# See: https://blog.railway.app/p/postgre-backup

# Config
COMMAND=${1}
BACKUP_DIR=${2}

PGUSER=${PGUSER:-"postgres"}
PGHOST=${PGHOST:-"containers-us-west-59.railway.app"}
PGPORT=${PGPORT:-"7066"}
PGDATABASE=${PGDATABASE:-"railway"}
# Password promted

function fail {
    printf '%s\n' "$1" >&2
    exit "${2-1}"
}

[[ -z "${COMMAND,,}" ]] && fail "No command specified!"
[[ -z "${BACKUP_DIR,,}" ]] && fail "No backup file specified!"

if [ "${COMMAND,,}" = "backup" ]; then
    docker run -i postgres \
        pg_dump -U $PGUSER -h $PGHOST -p $PGPORT -W -F t -d $PGDATABASE > "$BACKUP_DIR/$(date -u +"%Y-%m-%dT%H:%M:%SZ")-backup"
elif [ "${COMMAND,,}" = "restore" ]; then
    docker run -i postgres \
        pg_restore -U $PGUSER -h $PGHOST -p $PGPORT -W -F t -d $PGDATABASE > "$BACKUP_DIR/$(date -u +"%Y-%m-%dT%H:%M:%SZ")-backup"
fi