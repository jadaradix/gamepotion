# echo "xxx" | docker login --username "storydust" --password-stdin;
# docker pull storydust/oscar-production-api-core;
# docker stop oscar-production-api-core;
# docker rm oscar-production-api-core;
# docker run --name oscar-production-api-core -p 80:8000 -d storydust/oscar-production-api-core;
# sleep 5s;
# curl localhost:80;

docker rm oscar-production-api-core;
docker build -t oscar-production-api-core .;
docker run --name oscar-production-api-core -p 80:8000 -d oscar-production-api-core;
