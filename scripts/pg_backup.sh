#!/bin/sh
set -e

# See: https://blog.railway.app/p/postgre-backup

# Config
COMMAND=${1}

PGUSER=${PGUSER:-"postgres"}
PGHOST=${PGHOST:-"containers-us-west-59.railway.app"}
PGPORT=${PGPORT:-"7066"}
PGDATABASE=${PGDATABASE:-"railway"}
BACKUP_FILE=${2}

if [ "${COMMAND,,}" = "backup" ]; then
    docker run postgres \
        pg_dump -U $PGUSER -h $PGHOST -p $PGPORT -W -F t -d $PGDATABASE > $BACKUP_FILE
else
    docker run postgres \
        pg_restore -U $PGUSER -h $PGHOST -p $PGPORT -W -F t -d $PGDATABASE > $BACKUP_FILE
fi