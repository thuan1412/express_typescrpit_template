#!/bin/bash

# set server list
set -f
# string=$PROD_DEPLOY_SERVER
# array=(${string//,/ })

# echo 
ls ~/.ssh
echo "start ssh"
# echo $PROD_DEPLOY_SERVER
cat ~/.ssh/id_rsa
ssh -i ~/.ssh/id_rsa ubuntu@18.191.78.155 "cd dubbing-backend && git pull --force origin feat/set-up-ci-cd && sudo docker-compose restart"
echo "DONE!!!!!"

# iterate..
# for i in "${!array[@]}"; do
#     echo "Deploy on... ${array[i]}"
#     ssh ubuntu@${array[i]} "cd dubbing-backend && git pull origin feat/set-up-ci-cd && sudo docker-compose restart"
# done
