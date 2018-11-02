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
      'ball',
      'block',
      'puck',
      'wood'
    ]
  },
  {
    type: 'sound',
    nameSingular: 'sound',
    namePlural: 'Sounds',
    component: Sound,
    fixed: [
      'click',
      'explosion',
      'gun',
      'zap'
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
