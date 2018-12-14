import Instance from './Instance'

const instanceDefinitionsToInstances = (instances, resourceContainers) => {
  return instances
    .map(i => {
      const atomContainer = resourceContainers.find(r => r.resource.type === 'atom' && r.resource.id === i.atomId)
      if (atomContainer === undefined) return undefined
      const props = {
        x: i.x,
        y: i.y,
        z: i.z,
        vx: 0,
        vy: 0,
        vz: 0,
        frame: 0
      }
      const newInstance = new Instance(props, atomContainer)
      newInstance.setImage(atomContainer.resource.imageId, resourceContainers)
      return newInstance
    })
    .filter(i => i !== undefined)
}

export default instanceDefinitionsToInstances
