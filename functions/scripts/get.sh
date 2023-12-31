#!/bin/bash

GET_POSTS_ENDPOINT="http://127.0.0.1:5001/bstangram-d5be9/asia-northeast3/api/posts"
TOKEN="eyJhbGciOiJSUzI1NiIsImtpZCI6IjlhNTE5MDc0NmU5M2JhZTI0OWIyYWE3YzJhYTRlMzA2M2UzNDFlYzciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYnN0YW5ncmFtLWQ1YmU5IiwiYXVkIjoiYnN0YW5ncmFtLWQ1YmU5IiwiYXV0aF90aW1lIjoxNjk2NzM5ODE4LCJ1c2VyX2lkIjoiMTViN21lMmdrN1JTMFhtWUpRMEd2MEtKaTFFMiIsInN1YiI6IjE1YjdtZTJnazdSUzBYbVlKUTBHdjBLSmkxRTIiLCJpYXQiOjE2OTY3Mzk4MTgsImV4cCI6MTY5Njc0MzQxOCwiZW1haWwiOiJqZWUud2FuZ3VlQGFpcnNtZWQuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImplZS53YW5ndWVAYWlyc21lZC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.j3bIqoDq-PbY2V_RUrCfRRESlvcvHE38dKugzvn8NW6TAYuGYssL5_eDeCZbbGl-MzDcx3m5YJ6gJm04r7J3nLkjCwE17wyuq_VJa2sgRoR7BVKZ9-vV3jecFAXT1OvCMTKZ0L6cSUrYoYaY7h1X4uCkwvOoQscq6jOeHK2o1-8tuNOs6yAdadJLkwNoMolzDF7BXlwBJtssTsB4D7be4-o5J1GyIZHNCqsF-_ehnaOLJtNx-C9ifylQK1MzJOoZwIIcZSMuR2s2rqzoB4Y1TUimh5Bj0WKeKir8AyMc0WvFardoLUsWUYWJZbj60OxabiN2YPK0w-EoIIQmlBE5qw"

if [[ -z $GET_POSTS_ENDPOINT ]]; then
  echo "GET_POSTS endpoint must be specified"
  exit 1
fi

curl -s -X GET \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${TOKEN}" \
  $GET_POSTS_ENDPOINT 
