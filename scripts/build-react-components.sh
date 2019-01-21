cd app-oscar/src;
  rm -rf src/react-components; cp -R ../../abstractions/react-components src/react-components;
  rm src/localStorage.js; cp ../../abstractions/localStorage.js src/localStorage.js;
cd ../..;

cd app-store/src;
  rm -rf src/react-components; cp -R ../../abstractions/react-components src/react-components;
  rm src/localStorage.js; cp ../../abstractions/localStorage.js src/localStorage.js;
cd ../..;
