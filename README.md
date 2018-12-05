# Game Maker Club
Be the game boss.

## Install
```
  . scripts/install.sh
  . scripts/build.sh
```

## hosts file
```
167.99.203.136	oscar-production
127.0.0.1	api-core.gamemaker.club
127.0.0.1	api-bin.gamemaker.club
127.0.0.1	app.gamemaker.club
127.0.0.1	store.gamemaker.club
127.0.0.1	play.gamemaker.club
```

## container ports
```
1024 container-router
1025 api-core
1026 api-bin
1027 app-oscar
1028 app-store
1029 app-play (not done)
```

## Refactoring to do:
 - get rid of oscarErrored so we can optimise getImage AtomInstance method. it is called a LOT.
