. scripts/build.sh;

cd container-router;
  . build.sh;
cd ..;

cd api-core;
  . build.sh;
cd ..;

cd api-bin;
  . build.sh;
cd ..;

cd app-oscar;
  . build.sh;
cd ..;

cd app-store;
  . build.sh;
cd ..;
