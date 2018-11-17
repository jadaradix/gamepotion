cd ..;
  . scripts/build.sh;
cd app;

cd src;
  npm i;
  npm run build;
cd ..;

docker stop oscar-production-app;
docker rm oscar-production-app;
docker build -t oscar-production-app .;

docker tag oscar-production-app eu.gcr.io/thegmc-219013/oscar-production-app:latest;
docker push eu.gcr.io/thegmc-219013/oscar-production-app:latest;
