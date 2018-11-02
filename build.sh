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

cd platforms/html5;
  rm -rf classes; ln -s ../../classes classes;
cd ../..;
cd platforms/nds;
  rm -rf classes; ln -s ../../classes classes;
cd ../..;

cd api-core/src;
  rm -rf abstractions; ln -s ../../abstractions abstractions;
  rm -rf classes; ln -s ../../classes classes;
  rm -rf platforms; ln -s ../../platforms platforms;
cd ../..;

cd app/src;
  rm -rf abstractions;
  mkdir abstractions;
  mkdir abstractions/canvasRenderSpace;
  ln -s ../../../abstractions/events.json abstractions/events.json;
  ln -s ../../../abstractions/canvasRenderSpace abstractions/canvasRenderSpace;
  rm -rf classes; cp -R ../../classes classes;
  cd classes;
    rm -rf node_modules;
  cd ..;
cd ../..;
