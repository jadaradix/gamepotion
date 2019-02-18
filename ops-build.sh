. scripts/build.sh;
. scripts/build-classes.sh;
. scripts/build-react-components.sh;

cd api-core;
  . build.sh;
cd ..;

cd api-bin;
  . build.sh;
cd ..;

cd app;
  . build.sh;
cd ..;

cd app-store;
  . build.sh;
cd ..;

cd app-play;
  . build.sh;
cd ..;

cd site;
  . build.sh;
cd ..;

cd service-mail;
  . build.sh;
cd ..;
