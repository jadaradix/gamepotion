rm -rf files;
cp -R src files;

rm -rf files/node_modules;

rm files/abstractions;
cp -R ../abstractions files;
rm -rf files/abstractions/api/node_modules;
rm -rf files/abstractions/datalayer/node_modules;
rm -rf files/abstractions/storage/node_modules;
rm -rf files/abstractions/uuid/node_modules;

rm files/classes;
cp -R ../classes files;
rm -rf files/classes/node_modules;

rm files/config-gcp.json;
cp ../config-gcp.json files/config-gcp.json;

docker stop oscar-production-api-bin;
docker rm oscar-production-api-bin;
docker build -t oscar-production-api-bin .;

docker tag oscar-production-api-bin eu.gcr.io/thegmc-219013/oscar-production-api-bin:latest;
docker push eu.gcr.io/thegmc-219013/oscar-production-api-bin:latest;
