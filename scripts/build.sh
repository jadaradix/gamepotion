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

cd inter-router;
  npm run build;
cd ..;

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
  rm -rf src/classes; cp -R ../../classes src/classes; rm -rf src/classes/node_modules;
  rm -rf src/inter-router; cp -R ../../inter-router src/inter-router; rm -rf src/inter-router/node_modules;
cd ../..;

cd site/src;
  rm src/inter-router;
  rm src/videos.json;
  ln -s ../../../inter-router src/inter-router;
  ln -s ../../../videos.json src/videos.json;
cd ../..;
