import Instance from './Instance'

const degreesToRadians = (degrees) => {
  return degrees * Math.PI / 180
}

const instanceDefinitionsToInstances = (instances, resourceContainers) => {
  return instances
    .map(i => {
      const atomContainer = resourceContainers.find(r => r.resource.type === 'atom' && r.resource.id === i.atomId)
      if (atomContainer === undefined) return undefined
      const { x, y, z, angle } = i
      const props = {
        x,
        y,
        z,
        vx: 0,
        vy: 0,
        vz: 0,
        frame: 0,
        angle: degreesToRadians(angle)
      }
      const newInstance = new Instance(props, atomContainer)
      newInstance.setImage(atomContainer.resource.imageId, resourceContainers)
      return newInstance
    })
    .filter(i => i !== undefined)
}

export default instanceDefinitionsToInstances
