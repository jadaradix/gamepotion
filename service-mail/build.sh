rm -rf files;
cp -R src files;

rm -rf files/node_modules;

docker stop oscar-production-service-mail;
docker rm oscar-production-service-mail;
docker build -t oscar-production-service-mail .;

docker tag oscar-production-service-mail eu.gcr.io/thegmc-219013/oscar-production-service-mail:latest;
docker push eu.gcr.io/thegmc-219013/oscar-production-service-mail:latest;
