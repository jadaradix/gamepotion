# Install
```
  . scripts/install.sh
  . scripts/build.sh
  . scripts/build-classes.sh
```

# /etc/hosts file
```
167.99.203.136 gmc-production
127.0.0.1	api-core.gamemaker.club
127.0.0.1	api-bin.gamemaker.club
127.0.0.1	app.gamemaker.club
127.0.0.1	store.gamemaker.club
127.0.0.1	play.gamemaker.club
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
