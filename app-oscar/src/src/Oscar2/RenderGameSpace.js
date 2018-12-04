const RenderGameSpace = (
  {
    canvasElement,
    spaceContainer,
    resourceContainers,
    variables,
    designMode = false,
    gridOn = false,
    gridWidth = 16,
    gridHeight = 16,
    onSwitchSpace,
    onTouch = () => {},
    onTouchSecondary = () => {},
    onTouchMove = () => {}
  }
) => {

  const [c, ctx] = [canvasElement, canvasElement.getContext('2d')]
  c.width = (designMode ? spaceContainer.resource.width : spaceContainer.resource.camera.width)
  c.height = (designMode ? spaceContainer.resource.height : spaceContainer.resource.camera.height)
  c.style.display = 'block'
  c.style.backgroundColor = 'black'
  // stop blurred lines from https://stackoverflow.com/questions/4261090/html5-canvas-and-anti-aliasing
  ctx.imageSmoothingEnabled = false
  ctx.translate(0.5, 0.5)
  ctx.clearRect(
    0,
    0,
    (designMode ? spaceContainer.resource.width : spaceContainer.resource.camera.width),
    (designMode ? spaceContainer.resource.height : spaceContainer.resource.camera.height)
  )
  // ctx.fillStyle = '#ffffff'
  // ctx.font = '16px Arial'
  // ctx.fillText('Loading...', 16, 24)

  const free = () => {
    console.warn('[RenderGameSpace] [free]')
  }

  return {
    free
  }
}

export default RenderGameSpace
