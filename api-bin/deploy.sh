# echo "xxx" | docker login --username "storydust" --password-stdin;
# docker pull storydust/oscar-production-api-bin;
# docker stop oscar-production-api-bin;
# docker rm oscar-production-api-bin;
# docker run --name oscar-production-api-bin -p 80:8000 -d storydust/oscar-production-api-bin;
# sleep 5s;
# curl localhost:80;

docker rm oscar-production-api-bin;
docker build -t oscar-production-api-bin .;
docker run --name oscar-production-api-bin -p 80:8000 -d oscar-production-api-bin;
