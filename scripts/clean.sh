cd abstractions/uuid;
cd ../..;

cd classes;
  rm -rf abstractions;
cd ..;

cd platforms/nds;
  rm -rf classes;
cd ../..;

cd api-core/src;
  rm -rf abstractions;
  rm -rf classes;
  rm -rf platforms;
cd ../..;

cd api-bin/src;
  rm -rf abstractions;
  rm -rf classes;
cd ../..;

cd app/src/src;
  rm -rf abstractions;
  rm -rf classes;
cd ../../..;
