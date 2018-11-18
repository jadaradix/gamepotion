const getInstanceClassesAtCoords = (instanceClasses, coords) => {
  return instanceClasses
    .filter(ic => {
      const w = ic.getWidth()
      const h = ic.getHeight()
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
