cd src;
  npm i;
  npm run build;
cd ..;

docker stop oscar-production-app-store;
docker rm oscar-production-app-store;
docker build -t oscar-production-app-store .;

docker tag oscar-production-app-store eu.gcr.io/thegmc-219013/oscar-production-app-store:latest;
docker push eu.gcr.io/thegmc-219013/oscar-production-app-store:latest;
