cd src;
  npm i;
  npm run build;
cd ..;

docker stop oscar-production-site;
docker rm oscar-production-site;
docker build -t oscar-production-site .;

docker tag oscar-production-site eu.gcr.io/thegmc-219013/oscar-production-site:latest;
docker push eu.gcr.io/thegmc-219013/oscar-production-site:latest;
