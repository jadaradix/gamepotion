# Install
```
  . scripts/install.sh
  . scripts/build.sh
  . scripts/build-classes.sh
  . scripts/build-react-components.sh
```

# /etc/hosts file
```
167.99.203.136 gmc-production
127.0.0.1	api-core.gamepotion.online
127.0.0.1	api-bin.gamepotion.online
127.0.0.1	app.gamepotion.online
127.0.0.1	store.gamepotion.online
127.0.0.1	play.gamepotion.online
```

# Container ports
```
1024 container-router
1025 api-core
1026 api-bin
1027/3000 app-oscar
1028/3001 app-store
1029/3002 app-play
1030/3003 site
1031/1031 service-mail
```
