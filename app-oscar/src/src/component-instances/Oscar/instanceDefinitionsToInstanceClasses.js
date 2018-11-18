import AtomInstance from './AtomInstance'

const instanceDefinitionsToInstanceClasses = (resourceContainers, instances) => {
  return instances.map(i => {
    const atomContainer = resourceContainers.find(r => r.resource.type === 'atom' && r.resource.id === i.atomId)
    const imageContainer = resourceContainers.find(r => r.resource.type === 'image' && r.resource.id === atomContainer.resource.imageId)
    const props = {
      x: i.x,
      y: i.y,
      z: i.z,
      vx: 0,
      vy: 0,
      vz: 0
    }
    return new AtomInstance(props, atomContainer, imageContainer)
  })
}

export default instanceDefinitionsToInstanceClasses
