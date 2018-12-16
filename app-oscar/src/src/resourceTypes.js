import Image from './component-resources/Image'
import Sound from './component-resources/Sound'
import Atom from './component-resources/Atom'
import Space from './component-resources/Space'

const fixedResourceCollectionsByType = {
  'image': [
    {
      'id': 'oscar',
      'requiresPurchasedResourcePackModule': false,
      'credit': 'James Garner',
      'resources': [
        {
          id: 'sky',
          name: 'Starter Pack > Sky',
          width: 200,
          height: 200
        },
        {
          id: 'wood',
          name: 'Starter Pack > Wood',
          width: 96,
          height: 96
        },
        {
          id: 'ball-red',
          name: 'Starter Pack > Red ball',
          width: 32,
          height: 32
        },
        {
          id: 'ball-purple',
          name: 'Starter Pack > Purple ball',
          width: 32,
          height: 32
        }
      ]
    },
    {
      'id': 'cilein-kearns',
      'requiresPurchasedResourcePackModule': false,
      'credit': 'Ciléin Kearns',
      resources: [
        { id: 'cilein-kearns-Aquatic Pack-BubbleBig',
          name: 'Aquatic Pack > Bubble big',
          width: 32,
          height: 96 },
        { id: 'cilein-kearns-Aquatic Pack-BubbleSmall',
          name: 'Aquatic Pack > Bubble small',
          width: 16,
          height: 80 },
        { id: 'cilein-kearns-Aquatic Pack-BuckyFish',
          name: 'Aquatic Pack > Bucky fish',
          width: 32,
          height: 128 },
        { id: 'cilein-kearns-Aquatic Pack-GentleBlue',
          name: 'Aquatic Pack > Gentle blue',
          width: 256,
          height: 192 },
        { id: 'cilein-kearns-Aquatic Pack-Octopus',
          name: 'Aquatic Pack > Octopus',
          width: 64,
          height: 256 },
        { id: 'cilein-kearns-Aquatic Pack-RocksOverlay',
          name: 'Aquatic Pack > Rocks overlay',
          width: 256,
          height: 192 },
        { id: 'cilein-kearns-Aquatic Pack-SeaFloorUnderlay',
          name: 'Aquatic Pack > Sea floor underlay',
          width: 256,
          height: 192 },
        { id: 'cilein-kearns-Aquatic Pack-Seaweed',
          name: 'Aquatic Pack > Seaweed',
          width: 16,
          height: 80 },
        { id: 'cilein-kearns-Aquatic Pack-Shark',
          name: 'Aquatic Pack > Shark',
          width: 32,
          height: 256 },
        { id: 'cilein-kearns-Aquatic Pack-TreasureChest',
          name: 'Aquatic Pack > Treasure chest',
          width: 32,
          height: 96 },
        { id: 'cilein-kearns-Aquatic Pack-WorryFish',
          name: 'Aquatic Pack > Worry fish',
          width: 32,
          height: 128 },
        { id: 'cilein-kearns-Asteroids Pack-Barrier',
          name: 'Asteroids Pack > Barrier',
          width: 32,
          height: 160 },
        { id: 'cilein-kearns-Asteroids Pack-BulletStrip',
          name: 'Asteroids Pack > Bullet strip',
          width: 16,
          height: 96 },
        { id: 'cilein-kearns-Asteroids Pack-Enemy 1',
          name: 'Asteroids Pack > Enemy 1',
          width: 32,
          height: 32 },
        { id: 'cilein-kearns-Asteroids Pack-Enemy 2',
          name: 'Asteroids Pack > Enemy 2',
          width: 32,
          height: 32 },
        { id: 'cilein-kearns-Asteroids Pack-Enemy 3',
          name: 'Asteroids Pack > Enemy 3',
          width: 32,
          height: 32 },
        { id: 'cilein-kearns-Asteroids Pack-Player',
          name: 'Asteroids Pack > Player',
          width: 32,
          height: 32 },
        { id: 'cilein-kearns-Asteroids Pack-Space 1',
          name: 'Asteroids Pack > Space 1',
          width: 256,
          height: 192 },
        { id: 'cilein-kearns-Asteroids Pack-Space 2',
          name: 'Asteroids Pack > Space 2',
          width: 256,
          height: 192 },
        { id: 'cilein-kearns-Asteroids Pack-SpaceRed 1',
          name: 'Asteroids Pack > Space red 1',
          width: 256,
          height: 192 },
        { id: 'cilein-kearns-Asteroids Pack-SpaceRed 2',
          name: 'Asteroids Pack > Space red 2',
          width: 256,
          height: 192 },
        { id: 'cilein-kearns-PacMan Pack-Food',
          name: 'PacMan Pack > Food',
          width: 16,
          height: 208 },
        { id: 'cilein-kearns-PacMan Pack-GhostCyan',
          name: 'PacMan Pack > Ghost cyan',
          width: 16,
          height: 256 },
        { id: 'cilein-kearns-PacMan Pack-GhostEdible',
          name: 'PacMan Pack > Ghost edible',
          width: 16,
          height: 64 },
        { id: 'cilein-kearns-PacMan Pack-GhostEyes',
          name: 'PacMan Pack > Ghost eyes',
          width: 16,
          height: 64 },
        { id: 'cilein-kearns-PacMan Pack-GhostOrange',
          name: 'PacMan Pack > Ghost orange',
          width: 16,
          height: 256 },
        { id: 'cilein-kearns-PacMan Pack-GhostPink',
          name: 'PacMan Pack > Ghost pink',
          width: 16,
          height: 256 },
        { id: 'cilein-kearns-PacMan Pack-GhostRed',
          name: 'PacMan Pack > Ghost red',
          width: 16,
          height: 256 },
        { id: 'cilein-kearns-PacMan Pack-Map 1',
          name: 'PacMan Pack > Map 1',
          width: 256,
          height: 192 },
        { id: 'cilein-kearns-PacMan Pack-Map 2',
          name: 'PacMan Pack > Map 2',
          width: 256,
          height: 192 },
        { id: 'cilein-kearns-PacMan Pack-PacMan',
          name: 'PacMan Pack > Pac man',
          width: 16,
          height: 496 },
        { id: 'cilein-kearns-Shooter Pack-AmmoBig',
          name: 'Shooter Pack > Ammo big',
          width: 32,
          height: 32 },
        { id: 'cilein-kearns-Shooter Pack-AmmoSmall',
          name: 'Shooter Pack > Ammo small',
          width: 16,
          height: 16 },
        { id: 'cilein-kearns-Shooter Pack-Bang',
          name: 'Shooter Pack > Bang',
          width: 32,
          height: 192 },
        { id: 'cilein-kearns-Shooter Pack-Bottle_Blue',
          name: 'Shooter Pack > Bottle blue',
          width: 32,
          height: 96 },
        { id: 'cilein-kearns-Shooter Pack-Bottle_Brown',
          name: 'Shooter Pack > Bottle brown',
          width: 32,
          height: 96 },
        { id: 'cilein-kearns-Shooter Pack-Bottle_Green',
          name: 'Shooter Pack > Bottle green',
          width: 32,
          height: 96 },
        { id: 'cilein-kearns-Shooter Pack-Bottle_Red',
          name: 'Shooter Pack > Bottle red',
          width: 32,
          height: 96 },
        { id: 'cilein-kearns-Shooter Pack-Bottle_Yellow',
          name: 'Shooter Pack > Bottle yellow',
          width: 32,
          height: 96 },
        { id: 'cilein-kearns-Shooter Pack-BulletHoles',
          name: 'Shooter Pack > Bullet holes',
          width: 16,
          height: 80 },
        { id: 'cilein-kearns-Shooter Pack-CloudsScrollable',
          name: 'Shooter Pack > Clouds scrollable',
          width: 256,
          height: 192 },
        { id: 'cilein-kearns-Shooter Pack-ColaCan',
          name: 'Shooter Pack > Cola can',
          width: 32,
          height: 96 },
        { id: 'cilein-kearns-Shooter Pack-HandGun',
          name: 'Shooter Pack > Hand gun',
          width: 64,
          height: 128 },
        { id: 'cilein-kearns-Shooter Pack-HitEffect',
          name: 'Shooter Pack > Hit effect',
          width: 16,
          height: 80 },
        { id: 'cilein-kearns-Shooter Pack-ShotEffect',
          name: 'Shooter Pack > Shot effect',
          width: 32,
          height: 128 },
        { id: 'cilein-kearns-Shooter Pack-Shotgun',
          name: 'Shooter Pack > Shotgun',
          width: 64,
          height: 64 },
        { id: 'cilein-kearns-Shooter Pack-SniperScope',
          name: 'Shooter Pack > Sniper scope',
          width: 512,
          height: 512 },
        { id: 'cilein-kearns-Shooter Pack-TargetBlue',
          name: 'Shooter Pack > Target blue',
          width: 32,
          height: 128 },
        { id: 'cilein-kearns-Shooter Pack-TargetRange',
          name: 'Shooter Pack > Target range',
          width: 256,
          height: 192 },
        { id: 'cilein-kearns-Shooter Pack-TargetRed',
          name: 'Shooter Pack > Target red',
          width: 32,
          height: 128 },
        { id: 'cilein-kearns-Space Scroller Pack-BoosterEffect',
          name: 'Space Scroller Pack > Booster effect',
          width: 16,
          height: 81 },
        { id: 'cilein-kearns-Space Scroller Pack-BottomScreenDisplay',
          name: 'Space Scroller Pack > Bottom screen display',
          width: 256,
          height: 192 },
        { id: 'cilein-kearns-Space Scroller Pack-Bullets',
          name: 'Space Scroller Pack > Bullets',
          width: 16,
          height: 160 },
        { id: 'cilein-kearns-Space Scroller Pack-BulletsAnimated',
          name: 'Space Scroller Pack > Bullets animated',
          width: 16,
          height: 272 },
        { id: 'cilein-kearns-Space Scroller Pack-Earth',
          name: 'Space Scroller Pack > Earth',
          width: 64,
          height: 64 },
        { id: 'cilein-kearns-Space Scroller Pack-Explosion',
          name: 'Space Scroller Pack > Explosion',
          width: 32,
          height: 224 },
        { id: 'cilein-kearns-Space Scroller Pack-GreenGraph',
          name: 'Space Scroller Pack > Green graph',
          width: 256,
          height: 256 },
        { id: 'cilein-kearns-Space Scroller Pack-LivesInterface',
          name: 'Space Scroller Pack > Lives interface',
          width: 64,
          height: 64 },
        { id: 'cilein-kearns-Space Scroller Pack-Mars',
          name: 'Space Scroller Pack > Mars',
          width: 64,
          height: 64 },
        { id: 'cilein-kearns-Space Scroller Pack-Moon',
          name: 'Space Scroller Pack > Moon',
          width: 64,
          height: 64 },
        { id: 'cilein-kearns-Space Scroller Pack-PlayerShip',
          name: 'Space Scroller Pack > Player ship',
          width: 64,
          height: 256 },
        { id: 'cilein-kearns-Space Scroller Pack-SaucerGreen',
          name: 'Space Scroller Pack > Saucer green',
          width: 32,
          height: 128 },
        { id: 'cilein-kearns-Space Scroller Pack-SaucerRed',
          name: 'Space Scroller Pack > Saucer red',
          width: 32,
          height: 128 },
        { id: 'cilein-kearns-Space Scroller Pack-SpaceScroll',
          name: 'Space Scroller Pack > Space scroll',
          width: 512,
          height: 192 }
      ]
    },
    {
      'id': 'reiners-tilesets',
      'requiresPurchasedResourcePackModule': false,
      'credit': 'Reiner "Tiles" Prokein',
      'resources': [
        {
          id: 'reiners-tilesets-grass',
          name: 'Reiner\'s Tilesets > Grass texture',
          width: 32,
          height: 32
        },
        {
          id: 'reiners-tilesets-sand',
          name: 'Reiner\'s Tilesets > Sand texture',
          width: 32,
          height: 32
        },
        {
          id: 'reiners-tilesets-rocks',
          name: 'Reiner\'s Tilesets > Rocks',
          width: 64,
          height: 64
        },
        {
          id: 'reiners-tilesets-rock',
          name: 'Reiner\'s Tilesets > Rock',
          width: 64,
          height: 64
        },
        {
          id: 'reiners-tilesets-logs',
          name: 'Reiner\'s Tilesets > Logs',
          width: 64,
          height: 64
        },
        {
          id: 'reiners-tilesets-mushroom-blue',
          name: 'Reiner\'s Tilesets > Mushroom blue',
          width: 32,
          height: 32
        },
        {
          id: 'reiners-tilesets-mushroom-pink',
          name: 'Reiner\'s Tilesets > Mushroom pink',
          width: 32,
          height: 32
        }
      ]
    }
  ],
  'sound': [
    {
      'id': 'oscar',
      'requiresPurchasedResourcePackModule': false,
      'credit': 'James Garner',
      'resources': [
        {
          id: 'click'
        },
        {
          id: 'explosion'
        },
        {
          id: 'gun'
        },
        {
          id: 'zap'
        }
      ]
    }

  ]
}

export default [
  {
    type: 'image',
    nameSingular: 'image',
    namePlural: 'Images',
    component: Image,
    getFixed(purchasedResourcePackModule = false) {
      const availableFixedImageResourceCollections = fixedResourceCollectionsByType['image'].filter(ic => {
        return (ic.requiresPurchasedResourcePackModule ? purchasedResourcePackModule : true)
      })
      return availableFixedImageResourceCollections.reduce(
        (finalCollections, currentCollection) => finalCollections.concat(currentCollection.resources),
        []
      )
    }
  },
  {
    type: 'sound',
    nameSingular: 'sound',
    namePlural: 'Sounds',
    component: Sound,
    getFixed(purchasedResourcePackModule = false) {
      const availableFixedImageResourceCollections = fixedResourceCollectionsByType['sound'].filter(ic => {
        return (ic.requiresPurchasedResourcePackModule ? purchasedResourcePackModule : true)
      })
      return availableFixedImageResourceCollections.reduce(
        (finalCollections, currentCollection) => finalCollections.concat(currentCollection.resources),
        []
      )
    }
  },
  {
    type: 'atom',
    nameSingular: 'atom',
    namePlural: 'Atoms',
    component: Atom
  },
  {
    type: 'space',
    nameSingular: 'space',
    namePlural: 'Spaces',
    component: Space
  }
]
