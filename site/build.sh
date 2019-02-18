cd src;
  npm i;
  npm run build;
cd ..;

docker stop gamepotion-site;
docker rm gamepotion-site;
docker build -t gamepotion-site .;

docker tag gamepotion-site eu.gcr.io/thegmc-219013/gamepotion-site:latest;
docker push eu.gcr.io/thegmc-219013/gamepotion-site:latest;
