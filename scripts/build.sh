cd abstractions/uuid;
  npm run build;
cd ../..;

cd classes;
  rm -rf abstractions;
  mkdir abstractions;
  mkdir abstractions/uuid;
  cp ../abstractions/uuid/index.dist.js abstractions/uuid/index.dist.js;
  npm run build;
cd ..;

cd platforms/nds;
  rm -rf classes; ln -s ../../classes classes;
cd ../..;

cd api-core/src;
  rm -rf abstractions; ln -s ../../abstractions abstractions;
  rm -rf classes; ln -s ../../classes classes;
  rm -rf platforms; ln -s ../../platforms platforms;
cd ../..;

cd api-bin/src;
  rm -rf abstractions; ln -s ../../abstractions abstractions;
  rm -rf classes; ln -s ../../classes classes;
cd ../..;

cd app-oscar/src;
  rm -rf abstractions;
  mkdir abstractions;
  # ln -s ../../../abstractions/events.json abstractions/events.json;
  rm -rf src/classes; cp -R ../../classes src/classes;
  cd src/classes;
    rm -rf node_modules;
  cd ../..;
cd ../..;
