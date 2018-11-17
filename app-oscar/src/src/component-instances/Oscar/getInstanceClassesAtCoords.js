const getInstanceClassesAtCoords = (instanceClasses, coords) => {
  return instanceClasses
    .filter(ic => {
      const w = (ic.imageContainer && ic.imageContainer.resource.frameWidth) || 0
      const h = (ic.imageContainer && ic.imageContainer.resource.frameHeight) || 0
      const isIntersecting = (
        coords[0] >= ic.coords[0] &&
        coords[1] >= ic.coords[1] &&
        coords[0] < (ic.coords[0] + w) &&
        coords[1] < (ic.coords[1] + h)
      )
      return isIntersecting
    })
}

export default getInstanceClassesAtCoords
