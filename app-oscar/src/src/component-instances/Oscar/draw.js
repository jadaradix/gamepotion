const draw = (ctx, spaceContainer, instanceClasses, designMode, grid) => {
  ctx.clearRect(0, 0, spaceContainer.resource.width, spaceContainer.resource.height)
  if (spaceContainer.extras.backgroundImage !== null) {
    const imageWidth = spaceContainer.extras.backgroundImage.resource.frameWidth
    const imageHeight = spaceContainer.extras.backgroundImage.resource.frameHeight
    const xCount = (spaceContainer.resource.width + (spaceContainer.resource.width % imageWidth)) / imageWidth
    const yCount = (spaceContainer.resource.height + (spaceContainer.resource.height % imageHeight)) / imageHeight
    for (let x = 0; x < xCount; x++) {
      for (let y = 0; y < yCount; y++) {
        ctx.drawImage(spaceContainer.extras.backgroundImage.extras.element, x * imageWidth, y * imageHeight)
      }
    }    
  }
  instanceClasses.forEach(i => {
    i.imageContainer && ctx.drawImage(i.imageContainer.extras.image, i.coords[0], i.coords[1])
  })
  if (spaceContainer.extras.foregroundImage !== null) {
    ctx.drawImage(spaceContainer.extras.foregroundImage.extras.element, 0, 0)
  }
  const plotGrid = () => {
    let w = parseInt(grid.width, 10)
    let h = parseInt(grid.height, 10)
    ctx.beginPath()
    while (w < spaceContainer.resource.width) {
      ctx.moveTo(w, 0)
      ctx.lineTo(w, spaceContainer.resource.height)
      w += parseInt(grid.width, 10)
      while (h < spaceContainer.resource.height) {
        ctx.moveTo(0, h)
        ctx.lineTo(spaceContainer.resource.width, h)
        h += parseInt(grid.height, 10)
      }
    }
    ctx.closePath()
  }
  const plotCamera = () => {
    ctx.beginPath()
    ctx.rect(spaceContainer.resource.camera.x, spaceContainer.resource.camera.y, spaceContainer.resource.camera.width - 1, spaceContainer.resource.camera.height - 1)
    ctx.closePath()
  }
  if (designMode === true) {
    if (grid.on === true) {
      ctx.globalAlpha = 0.5
      plotGrid()
      ctx.strokeStyle = '#ffffff'
      ctx.stroke()
      ctx.globalAlpha = 1
    }
    ctx.globalAlpha = 0.75
    plotCamera()
    ctx.strokeStyle = '#ff0000'
    ctx.stroke()
    ctx.globalAlpha = 1
  }
}

export default draw
