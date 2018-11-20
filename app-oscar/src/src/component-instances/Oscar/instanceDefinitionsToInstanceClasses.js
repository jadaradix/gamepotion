import GameAtomInstance from './GameAtomInstance'

const instanceDefinitionsToInstanceClasses = (instances, resourceContainers) => {
  return instances.map(i => {
    const atomContainer = resourceContainers.find(r => r.resource.type === 'atom' && r.resource.id === i.atomId)
    
    const props = {
      x: i.x,
      y: i.y,
      z: i.z,
      vx: 0,
      vy: 0,
      vz: 0,
      frame: 0
    }
    const newInstance = new GameAtomInstance(props, atomContainer)
    newInstance.setImage(atomContainer.resource.imageId, resourceContainers)
    return newInstance
  })
}

export default instanceDefinitionsToInstanceClasses
