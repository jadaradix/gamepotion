cd classes;
  rm -rf abstractions;
  mkdir abstractions;
  mkdir abstractions/uuid;
  cp ../abstractions/uuid/index.dist.js abstractions/uuid/index.dist.js;
  npm run build;
cd ..;

cd app-oscar/src;
  rm -rf src/classes; mkdir -p src/classes;
  cp -R ../../classes/classes src/classes/classes;
  cp -R ../../classes/abstractions src/classes/abstractions;
  cp ../../classes/factory.js src/classes/factory.js;
  cp ../../classes/index.js src/classes/index.js;
cd ../..;

cd app-play/src;
  rm -rf src/classes; mkdir -p src/classes;
  cp -R ../../classes/classes src/classes/classes;
  cp -R ../../classes/abstractions src/classes/abstractions;
  cp ../../classes/factory.js src/classes/factory.js;
  cp ../../classes/index.js src/classes/index.js;
cd ../..;

cd api-core/src;
  rm -rf classes; ln -s ../../classes classes;
cd ../..;

cd api-bin/src;
  rm -rf classes; ln -s ../../classes classes;
cd ../..;

cd platforms/nds;
  rm -rf classes; ln -s ../../classes classes;
cd ../..;
