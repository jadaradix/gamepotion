# echo "xxx" | docker login --username "storydust" --password-stdin;
docker pull storydust/oscar-production-app;
docker stop oscar-production-app;
docker rm oscar-production-app;
docker run --name oscar-production-app -p 80:8000 -d storydust/oscar-production-app;
sleep 5s;
curl localhost:80;

# docker rm oscar-production-app;
# docker build -t oscar-production-app .;
# docker run --name oscar-production-app -p 80:8000 -d oscar-production-app;
