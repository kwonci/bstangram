#!/bin/bash

SIGNIN_ENDPOINT="http://127.0.0.1:5001/bstangram-d5be9/asia-northeast3/api/signin"

if [[ -z $SIGNIN_ENDPOINT ]]; then
  echo "SIGNIN_ENDPOINT endpoint must be specified"
  exit 1
fi

curl -s -X POST -H "Content-Type: application/json" -d '{
  "email": "jee.wangue@airsmed.com",
  "password": "password1234"
}' $SIGNIN_ENDPOINT 

