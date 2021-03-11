#!/bin/bash

# set server list
set -f
string=$PROD_DEPLOY_SERVER
array=(${string//,/ })

echo 

# iterate..
for i in "${!array[@]}"; do
    echo "Deploy on... ${array[i]}"
    ssh ubuntu@${array[i]} "cd /app && git pull origin feat/set-up-ci-cd && sudo docker-compose"
done
