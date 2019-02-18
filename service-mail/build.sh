rm -rf files;
cp -R src files;

rm -rf files/node_modules;

docker stop gamepotion-service-mail;
docker rm gamepotion-service-mail;
docker build -t gamepotion-service-mail .;

docker tag gamepotion-service-mail eu.gcr.io/thegmc-219013/gamepotion-service-mail:latest;
docker push eu.gcr.io/thegmc-219013/gamepotion-service-mail:latest;
