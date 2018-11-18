import AtomInstance from './AtomInstance'

const instanceDefinitionsToInstanceClasses = (resourceContainers, instances) => {
  return instances.map(i => {
    const atomContainer = resourceContainers.find(r => r.resource.type === 'atom' && r.resource.id === i.atomId)
    const imageContainer = resourceContainers.find(r => r.resource.type === 'image' && r.resource.id === atomContainer.resource.imageId)
    const coords = [i.x, i.y, i.z]
    return new AtomInstance(coords, atomContainer, imageContainer)
  })
}

export default instanceDefinitionsToInstanceClasses
