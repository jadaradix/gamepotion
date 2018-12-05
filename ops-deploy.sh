docker login -u _json_key -p "$(cat config-gcp.json)" https://eu.gcr.io;

echo "1 creating network";
docker network create container-router;

echo "2 running container-router";
docker pull eu.gcr.io/thegmc-219013/oscar-production-container-router:latest;
docker stop oscar-production-container-router;
docker rm oscar-production-container-router;
docker run --name oscar-production-container-router --net container-router -p 1024:1024 -d eu.gcr.io/thegmc-219013/oscar-production-container-router;

echo "3 running api-core";
docker pull eu.gcr.io/thegmc-219013/oscar-production-api-core:latest;
docker stop oscar-production-api-core;
docker rm oscar-production-api-core;
docker run --name oscar-production-api-core --net container-router -p 1025:1025 -d eu.gcr.io/thegmc-219013/oscar-production-api-core;

echo "4 running api-bin";
docker pull eu.gcr.io/thegmc-219013/oscar-production-api-bin:latest;
docker stop oscar-production-api-bin;
docker rm oscar-production-api-bin;
docker run --name oscar-production-api-bin --net container-router -p 1026:1026 -d eu.gcr.io/thegmc-219013/oscar-production-api-bin;

echo "5 running app-oscar";
docker pull eu.gcr.io/thegmc-219013/oscar-production-app-oscar:latest;
docker stop oscar-production-app-oscar;
docker rm oscar-production-app-oscar;
docker run --name oscar-production-app-oscar --net container-router -p 1027:1027 -d eu.gcr.io/thegmc-219013/oscar-production-app-oscar;

echo "6 running app-store";
docker pull eu.gcr.io/thegmc-219013/oscar-production-app-store:latest;
docker stop oscar-production-app-store;
docker rm oscar-production-app-store;
docker run --name oscar-production-app-store --net container-router -p 1028:1028 -d eu.gcr.io/thegmc-219013/oscar-production-app-store;
