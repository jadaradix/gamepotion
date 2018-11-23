docker stop oscar-production-container-router;
docker rm oscar-production-container-router;
docker build -t oscar-production-container-router .;

docker tag oscar-production-container-router eu.gcr.io/thegmc-219013/oscar-production-container-router:latest;
docker push eu.gcr.io/thegmc-219013/oscar-production-container-router:latest;
