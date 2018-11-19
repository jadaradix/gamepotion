import Image from './component-resources/Image'
import Sound from './component-resources/Sound'
import Atom from './component-resources/Atom'
import Space from './component-resources/Space'

export default [
  {
    type: 'image',
    nameSingular: 'image',
    namePlural: 'Images',
    component: Image,
    fixed: [
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
    type: 'sound',
    nameSingular: 'sound',
    namePlural: 'Sounds',
    component: Sound,
    fixed: [
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
  },
  {
    type: 'atom',
    nameSingular: 'atom',
    namePlural: 'Atoms',
    component: Atom,
    fixed: []
  },
  {
    type: 'space',
    nameSingular: 'space',
    namePlural: 'Spaces',
    component: Space,
    fixed: []
  }
]
