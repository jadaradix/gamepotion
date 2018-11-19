const draw = (ctx, spaceContainer, instanceClasses, designMode, grid) => {
  ctx.clearRect(0, 0, spaceContainer.resource.width, spaceContainer.resource.height)
  if (spaceContainer.extras.backgroundImage !== null) {
    const {
      frameWidth,
      frameHeight
    } = spaceContainer.extras.backgroundImage.resource
    const xCount = (spaceContainer.resource.width + (spaceContainer.resource.width % frameWidth)) / frameWidth
    const yCount = (spaceContainer.resource.height + (spaceContainer.resource.height % frameHeight)) / frameHeight
    for (let x = 0; x < xCount; x++) {
      for (let y = 0; y < yCount; y++) {
        ctx.drawImage(spaceContainer.extras.backgroundImage.extras.element, x * frameWidth, y * frameHeight)
      }
    }    
  }
  instanceClasses.forEach(i => {
    const frame = i.props.frame
    const image = i.getImage()
    const width = i.getWidth()
    const height = i.getHeight()
    // drawImage(img,sx,sy,swidth,sheight,x,y,width,height)
    if (image !== null) {
      ctx.drawImage(image, 0, frame * height, width, height, i.props.x, i.props.y, width, height) 
    }
  })
  if (spaceContainer.extras.foregroundImage !== null) {
    ctx.drawImage(spaceContainer.extras.foregroundImage.extras.element, 0, 0)
  }
  const plotGrid = () => {
    let x = parseInt(grid.width, 10)
    let y = parseInt(grid.height, 10)
    ctx.beginPath()
    while (x < spaceContainer.resource.width) {
      ctx.moveTo(x, 0)
      ctx.lineTo(x, spaceContainer.resource.height)
      x += parseInt(grid.width, 10)
      while (y < spaceContainer.resource.height) {
        ctx.moveTo(0, y)
        ctx.lineTo(spaceContainer.resource.width, y)
        y += parseInt(grid.height, 10)
      }
    }
    ctx.closePath()
  }
  const plotCamera = () => {
    ctx.beginPath()
    const {
      x,
      y,
      width,
      height
    } = spaceContainer.resource.camera
    ctx.rect(x, y, width - 1, height - 1)
    ctx.closePath()
  }
  if (designMode === true) {
    if (grid && grid.on === true) {
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
