cd ..;
  . scripts/build.sh;
cd api-core;

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

rm files/platforms;
cp -R ../platforms files;
rm -rf files/platforms/nds/node_modules;

rm files/config-gcp.json;
cp ../config-gcp.json files/config-gcp.json;

# docker stop oscar-production-api-core;
# docker rm oscar-production-api-core;
# docker build -t oscar-production-api-core .;
# docker tag oscar-production-api-core storydust/oscar-production-api-core;
# docker push storydust/oscar-production-api-core;
