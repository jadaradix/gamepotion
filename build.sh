cd classes;
  npm run build;
cd ..;

cd api-core/src;
  rm -rf abstractions; ln -s ../../abstractions abstractions;
  rm -rf classes; ln -s ../../classes classes;
cd ../..;
