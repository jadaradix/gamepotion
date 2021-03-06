# ...

cd abstractions/api;
  # ...
cd ../..;
cd abstractions/datalayer;
  npm test;
cd ../..;
cd abstractions/storage;
  npm test;
cd ../..;
cd abstractions/uuid;
  npm test;
cd ../..;
cd abstractions/inspect-image;
  npm test;
cd ../..;

cd api-core/src;
  npm test;
cd ../..;
cd api-bin/src;
  npm test;
cd ../..;

cd app/src;
  CI=true npm test;
cd ../..;

cd classes;
  npm test;
cd ..;

cd platforms/nds;
  npm test;
cd ../..;

cd inter-router;
  npm test;
cd ..;
