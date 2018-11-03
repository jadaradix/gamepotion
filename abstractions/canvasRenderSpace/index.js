const canvasRenderSpace = (element, space, resources) => {
  ((e) => {
    e.width = space.width
    e.height = space.height
    e.style.display = 'block'
    e.style.backgroundColor = 'black'
    e.style.width = space.width
    e.style.height = space.height
  })(element)
  return null
}

export default canvasRenderSpace
