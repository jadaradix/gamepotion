cd src;
  npm i;
  npm run build;
cd ..;

docker stop oscar-production-app-play;
docker rm oscar-production-app-play;
docker build -t oscar-production-app-play .;

docker tag oscar-production-app-play eu.gcr.io/thegmc-219013/oscar-production-app-play:latest;
docker push eu.gcr.io/thegmc-219013/oscar-production-app-play:latest;
