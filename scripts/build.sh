cd abstractions/uuid;
  npm run build;
cd ../..;

cd inter-router;
  npm run build;
cd ..;

cd api-core/src;
  rm -rf abstractions; ln -s ../../abstractions abstractions;
  rm -rf platforms; ln -s ../../platforms platforms;
cd ../..;

cd api-bin/src;
  rm -rf abstractions; ln -s ../../abstractions abstractions;
cd ../..;

cd app-oscar/src;
  rm -rf src/inter-router; cp -R ../../inter-router src/inter-router; rm -rf src/inter-router/node_modules;
cd ../..;

cd site/src;
  rm src/inter-router;
  rm src/videos.json;
  ln -s ../../../inter-router src/inter-router;
  ln -s ../../../videos.json src/videos.json;
cd ../..;
