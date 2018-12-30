cd classes;
  rm -rf abstractions;
  mkdir abstractions;
  mkdir abstractions/uuid;
  cp ../abstractions/uuid/index.dist.js abstractions/uuid/index.dist.js;
  npm run build;
cd ..;

cd app-oscar/src;
  # how can we avoid copying node_modules?
  rm -rf src/classes; cp -R ../../classes src/classes; rm -rf src/classes/node_modules;
cd ../..;

cd app-play/src;
  # how can we avoid copying node_modules?
  rm -rf src/classes; cp -R ../../classes src/classes; rm -rf src/classes/node_modules;
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
