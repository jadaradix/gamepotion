const getInstanceClassesAtCoords = (instanceClasses, coords) => {
  return instanceClasses
    .filter(ic => {
      const w = (ic.imageContainer && ic.imageContainer.resource.frameWidth) || 0
      const h = (ic.imageContainer && ic.imageContainer.resource.frameHeight) || 0
      const isIntersecting = (
        coords.x >= ic.props.x &&
        coords.y >= ic.props.y &&
        coords.x < (ic.props.x + w) &&
        coords.y < (ic.props.y + h)
      )
      return isIntersecting
    })
}

export default getInstanceClassesAtCoords
