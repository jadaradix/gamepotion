# echo "xxx" | docker login --username "storydust" --password-stdin;
docker pull storydust/oscar-production-app-oscar;
docker stop oscar-production-app-oscar;
docker rm oscar-production-app-oscar;
docker run --name oscar-production-app-oscar -p 1027:8000 -d storydust/oscar-production-app-oscar;
sleep 5s;
curl localhost:1027;

# docker rm oscar-production-app-oscar;
# docker build -t oscar-production-app-oscar .;
# docker run --name oscar-production-app-oscar -p 1027:8000 -d oscar-production-app-oscar;
