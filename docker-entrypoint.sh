#!/bin/sh

if [[ -z "${MONGO_HOST}"] || [ -z "${MONGO_PORT}" ]]; then 
  echo 'Mongo host and port need to be set by env variables MONGO_HOST and MONGO_PORT'
  exit 1
fi

echo "Mongo host: ${MONGO_HOST}"
echo "Mongo port: ${MONGO_PORT}"

exec "$@"