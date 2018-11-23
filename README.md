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
127.0.0.1	play.gamemaker.club
```

## Refactoring to do:
 - get rid of oscarErrored so we can optimise getImage AtomInstance method. it is called a LOT.
