#!/bin/bash

CREATE_POST_ENDPOINT="http://127.0.0.1:5001/bstangram-d5be9/us-central1/api/posts"

if [[ -z $CREATE_POST_ENDPOINT ]]; then
  echo "CREATE_POST endpoint must be specified"
  exit 1
fi

curl -s -X POST -H "Content-Type: application/json" -d '{
  "userHandle": "user_handle_2",
  "body": "user_body-2"
}' $CREATE_POST_ENDPOINT 

