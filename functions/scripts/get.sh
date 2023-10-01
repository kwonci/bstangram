#!/bin/bash

GET_POSTS_ENDPOINT="http://127.0.0.1:5001/bstangram-d5be9/us-central1/api/posts"

if [[ -z $GET_POSTS_ENDPOINT ]]; then
  echo "GET_POSTS endpoint must be specified"
  exit 1
fi

curl -s -X GET -H "Content-Type: application/json" $GET_POSTS_ENDPOINT 
