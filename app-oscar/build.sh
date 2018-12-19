cd src;
  npm i;
  npm run build;
cd ..;

docker stop oscar-production-app-oscar;
docker rm oscar-production-app-oscar;
docker build -t oscar-production-app-oscar .;

docker tag oscar-production-app-oscar eu.gcr.io/thegmc-219013/oscar-production-app-oscar:latest;
docker push eu.gcr.io/thegmc-219013/oscar-production-app-oscar:latest;
