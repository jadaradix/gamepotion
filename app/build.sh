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
docker tag oscar-production-app storydust/oscar-production-app;
docker push storydust/oscar-production-app;
