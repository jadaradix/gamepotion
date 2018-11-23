docker login -u _json_key -p "$(cat ../config-gcp.json)" https://eu.gcr.io;
docker pull eu.gcr.io/thegmc-219013/oscar-production-container-router:latest;
docker pull eu.gcr.io/thegmc-219013/oscar-production-api-bin:latest;
docker pull eu.gcr.io/thegmc-219013/oscar-production-app-oscar:latest;
docker pull eu.gcr.io/thegmc-219013/oscar-production-app-oscar:latest;

echo "2 creating network";
docker network create container-router;

echo "3 running container-router";
docker stop oscar-production-container-router;
docker rm oscar-production-container-router;
docker run --name oscar-production-container-router --net container-router -p 1024:1024 -d eu.gcr.io/thegmc-219013/oscar-production-container-router;

echo "4 running api-core";
docker stop oscar-production-api-core;
docker rm oscar-production-api-core;
docker run --name oscar-production-api-core --net container-router -p 1025:1025 -d eu.gcr.io/thegmc-219013/oscar-production-api-core;

echo "5 running api-bin";
docker stop oscar-production-api-bin;
docker rm oscar-production-api-bin;
docker run --name oscar-production-api-bin --net container-router -p 1026:1026 -d eu.gcr.io/thegmc-219013/oscar-production-api-bin;

echo "6 running app-oscar";
docker stop oscar-production-app-oscar;
docker rm oscar-production-app-oscar;
docker run --name oscar-production-app-oscar --net container-router -p 1027:1027 -d eu.gcr.io/thegmc-219013/oscar-production-app-oscar;

# sleep 5s;
# curl app.gamemaker.club:1024;
