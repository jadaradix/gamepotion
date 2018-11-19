# Game Maker Club
Be the game boss.

## Install

```
  . scripts/install.sh
  . scripts/build.sh
```

## Refactoring to do:
 - setImage logic - this is done by "instance classes map" code AND handleEvent; nasty.
 - get rid of oscarErrored so we can optimise getImage AtomInstance method. it is called a LOT.
