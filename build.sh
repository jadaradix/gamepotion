cd classes;
  rm -rf abstractions; ln -s ../abstractions abstractions;
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
  rm -rf classes; ln -s ../../classes classes;
cd ../..;
