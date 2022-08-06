#!/bin/bash
set -e
set -u
sleep 10

main() {
  echo "CREATING UUID-OSSP and pgcrypto EXTENSIONS" 
  create_extensions
  echo "EXTENSIONS CREATED SUCCESSFULLY"
}


create_extensions() {
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      CREATE EXTENSION IF NOT EXISTS "pgcrypto";
EOSQL
}

main "$@"

