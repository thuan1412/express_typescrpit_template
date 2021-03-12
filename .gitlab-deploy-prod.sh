#!/bin/bash

# set server list
set -f

# echo 
ls ~/.ssh
echo "start ssh"
# echo $PROD_DEPLOY_SERVER
ssh -i ~/.ssh/id_rsa ubuntu@18.191.78.155 "cd dubbing-backend && git pull --force origin feat/set-up-ci-cd && sudo docker-compose restart"
echo "DONE!!!!!"