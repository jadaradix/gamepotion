cd src;
  npm i;
  npm run build;
cd ..;

docker stop gamepotion-app-store;
docker rm gamepotion-app-store;
docker build -t gamepotion-app-store .;

docker tag gamepotion-app-store eu.gcr.io/thegmc-219013/gamepotion-app-store:latest;
docker push eu.gcr.io/thegmc-219013/gamepotion-app-store:latest;
