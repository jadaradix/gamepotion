cd src;
  npm i;
  npm run build;
cd ..;

docker stop gamepotion-app-oscar;
docker rm gamepotion-app-oscar;
docker build -t gamepotion-app-oscar .;

docker tag gamepotion-app-oscar eu.gcr.io/thegmc-219013/gamepotion-app-oscar:latest;
docker push eu.gcr.io/thegmc-219013/gamepotion-app-oscar:latest;
