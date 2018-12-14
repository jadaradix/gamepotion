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
          id: 'ball',
          width: 64,
          height: 64
        },
        {
          id: 'block',
          width: 32,
          height: 32
        },
        {
          id: 'puck',
          width: 16,
          height: 16
        },
        {
          id: 'wood',
          width: 320,
          height: 240
        }
      ]
    },
    {
      'id': 'reiners-tilesets',
      'requiresPurchasedResourcePackModule': false,
      'credit': 'Reiner "Tiles" Prokein',
      'resources': [
        {
          id: 'reiners-tilesets-grass',
          name: 'Grass Texture (Reiner\'s Tilesets)',
          width: 32,
          height: 32
        },
        {
          id: 'reiners-tilesets-sand',
          name: 'Sand Texture (Reiner\'s Tilesets)',
          width: 32,
          height: 32
        },
        {
          id: 'reiners-tilesets-rocks',
          name: 'Rocks (Reiner\'s Tilesets)',
          width: 64,
          height: 64
        },
        {
          id: 'reiners-tilesets-rock',
          name: 'Rock (Reiner\'s Tilesets)',
          width: 64,
          height: 64
        },
        {
          id: 'reiners-tilesets-logs',
          name: 'Logs (Reiner\'s Tilesets)',
          width: 64,
          height: 64
        },
        {
          id: 'reiners-tilesets-mushroom-blue',
          name: 'Mushroom (blue) (Reiner\'s Tilesets)',
          width: 32,
          height: 32
        },
        {
          id: 'reiners-tilesets-mushroom-pink',
          name: 'Mushroom (pink) (Reiner\'s Tilesets)',
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
