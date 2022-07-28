#!/bin/bash
set -e
set -u

echo "EXTENSIONS CREATING"

function create_extensions() {
  psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -d "$POSTGRES_DB" <<-EOSQL
	    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      CREATE EXTENSION IF NOT EXISTS "pgcrypto";
EOSQL
}

create_extensions

echo "EXTENSIONS CREATED SUCCESSFULLY"
