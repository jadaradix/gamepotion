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
cp ../secrets/config-gcp.json files/config-gcp.json;

docker stop gamepotion--api-bin;
docker rm gamepotion--api-bin;
docker build -t gamepotion--api-bin .;

docker tag gamepotion--api-bin eu.gcr.io/euphoric-adventures/gamepotion--api-bin:latest;
docker push eu.gcr.io/euphoric-adventures/gamepotion--api-bin:latest;
