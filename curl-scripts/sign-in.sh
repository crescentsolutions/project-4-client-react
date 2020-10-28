#!/bin/bash

API="http://localhost:4741"
URL_PATH="/sign-in"
EMAIL="d@p"
PASSWORD="z"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "'"${EMAIL}"'",
      "password": "'"${PASSWORD}"'"
    }
  }'

echo

# EMAIL="d@me" PASSWORD="z" sh curl-scripts/auth/sign-in.sh
