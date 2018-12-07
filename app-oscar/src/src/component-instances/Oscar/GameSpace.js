class GameSpace {

  handleEvent(eventId, eventContext, instanceClasses, appliesToInstanceClasses) {
    let instanceClassesToDestroy = []
    let instancesToCreate = []
    appliesToInstanceClasses.forEach(i => {
      i.atomContainer.extras.events.filter(e => e.id === eventId).forEach(e => {
        const actions = e.actions
        const actionBacks = i.onEvent(actions, eventContext).filter(ab => typeof ab === 'object' && ab !== null)
        actionBacks.forEach(actionBack => {
          const result = handleActionBack(actionBack)
          instanceClassesToDestroy = instanceClassesToDestroy.concat(result.instanceClassesToDestroy)
          instancesToCreate = instancesToCreate.concat(result.instancesToCreate)
          if (typeof result.imageToSet === 'string') {
            i.setImage(result.imageToSet, eventContext.resourceContainers)
          }
          if (typeof result.spaceToGoTo === 'string') {
            this.props.onSwitchSpace(result.spaceToGoTo)
          }
        })
      })
    })
    if (instanceClassesToDestroy.length > 0) {
      console.log('[Oscar] [handleEvent] instanceClassesToDestroy', instanceClassesToDestroy)
      instanceClasses = this.handleEvent('Destroy', eventContext, instanceClasses, instanceClassesToDestroy)
    }
    const createdInstances = instanceDefinitionsToInstanceClasses(instancesToCreate, eventContext.resourceContainers)
    instanceClasses = instanceClasses.concat(createdInstances)
    if (createdInstances.length > 0) {
      console.log('[Oscar] [handleEvent] createdInstances', createdInstances)
      instanceClasses = this.handleEvent('Create', eventContext, instanceClasses, createdInstances)
    }
    instanceClasses = instanceClasses.filter(ic => {
      const willDestroy = instanceClassesToDestroy.includes(ic)
      return (!willDestroy)
    })
    return instanceClasses
  }

  handleEventStart(instanceClasses) {
    // console.warn('[Oscar] [handleEventStart] instanceClasses', instanceClasses)
    const eventContext = {
      instanceClasses,
      spaceContainer: this.props.spaceContainer,
      resourceContainers: this.props.resourceContainers,
      variables: this.props.variables
    }
    return this.handleEvent('Create', eventContext, instanceClasses, instanceClasses)
  }

  handleEventStep(instanceClasses) {
    // console.warn('[Oscar] [handleEventStep] this.props.designMode', this.props.designMode)
    // hack: stops rendering on the 'last frame' of step event when turning 'Play' off in the editor
    if (this.props.designMode === true) {
      return []
    }
    instanceClasses.forEach(i => {
      i.onStep()
    })
    const eventContext = {
      instanceClasses,
      spaceContainer: this.props.spaceContainer,
      resourceContainers: this.props.resourceContainers,
      variables: this.props.variables
    }
    return this.handleEvent('Step', eventContext, instanceClasses, instanceClasses)
  }

  renderCanvas(canvas) {
  
    let resourceContainersLoadedSoFar = 0
    const totalResourceContainersToLoad = this.props.resourceContainers.filter(r => ['image', 'sound'].includes(r.resource.type)).length

    const loadGoodLogic = () => {
      resourceContainersLoadedSoFar += 1
      console.warn(`[Oscar] [Space] [renderCanvas] [loadGoodLogic] done ${resourceContainersLoadedSoFar}/${totalResourceContainersToLoad}`)
      if (resourceContainersLoadedSoFar === totalResourceContainersToLoad) {
        loadedGood()
      }
    }
    const loadedGood = () => {
      console.warn('[Oscar] [Space] [renderCanvas] [loadedGood]')
      if (this.props.designMode === true) {
        console.warn('entere here first')
        draw(ctx, this.props.spaceContainer, instanceClasses, this.props.designMode, this.props.gridOn, parseInt(this.props.gridWidth, 10), parseInt(this.props.gridHeight, 10))
      } else {
        instanceClasses = this.handleEventStart(instanceClasses)
        const logic = () => {
          instanceClasses = this.handleEventStep(instanceClasses)
          draw(ctx, this.props.spaceContainer, instanceClasses, this.props.designMode, this.props.gridOn, parseInt(this.props.gridWidth, 10), parseInt(this.props.gridHeight, 10))
          if (this.props.designMode === false) {
            window.requestAnimationFrame(logic)
          }
        }
        logic()
      }
    }
    // const loadedBad = () => {
    //   console.warn('[Oscar] [Space] [renderCanvas] [loadedBad]')
    //   ctx.clearRect(
    //     0,
    //     0,
    //     (this.props.designMode ? this.props.spaceContainer.resource.width : this.props.spaceContainer.resource.camera.width),
    //     (this.props.designMode ? this.props.spaceContainer.resource.height : this.props.spaceContainer.resource.camera.height)
    //   )
    //   ctx.fillStyle = '#ffffff'
    //   ctx.font = '16px Arial'
    //   ctx.fillText('This space could not be loaded.', 16, 24)
    //   this.removeEventListeners()
    // }
    //
    // GET READY FOR EVENTS
    //
    const resourcesAtoms = this.props.resourceContainers.filter(r => r.resource.type === 'atom')
    resourcesAtoms
      .forEach(r => {
        r.extras.events = r.resource.events.map(e => {
          return {
            id: e.id,
            configuration: e.configuration,
            actions: e.actions.map(a => {
              const actionClassInstance = actionClassInstances.get(a.id)
              const argumentTypes = Array.from(actionClassInstance.defaultRunArguments.values()).map(ar => ar.type)
              return {
                id: actionClassInstance.id,
                run: actionClassInstance.run,
                runArguments: a.runArguments,
                appliesTo: a.appliesTo,
                argumentTypes
              }
            })
          }
        })
      })

    //
    // LOAD IMAGES
    //
    const resourcesImages = this.props.resourceContainers.filter(r => r.resource.type === 'image')
    resourcesImages.forEach(resource => {
      const element = new window.Image()
      this.addEventListener(element, 'load', loadGoodLogic)
      this.addEventListener(element, 'error', () => {
        element.dataset.oscarErrored = true
        loadGoodLogic()
      })
      resource.extras.element = element
      element.src = resource.resource.getRemoteUrl()
      if (this.props.spaceContainer.resource.backgroundImage === resource.resource.id) {
        this.props.spaceContainer.extras.backgroundImage = resource
      }
      if (this.props.spaceContainer.resource.foregroundImage === resource.resource.id) {
        this.props.spaceContainer.extras.foregroundImage = resource
      }
      resource.extras.image = element
    })

    //
    // LOAD SOUNDS
    //
    const resourcesSounds = this.props.resourceContainers.filter(r => r.resource.type === 'sound')
    resourcesSounds.forEach(resource => {
      const element = new window.Audio()
      this.addEventListener(element, 'loadedmetadata', loadGoodLogic)
      this.addEventListener(element, 'error', () => {
        element.dataset.oscarErrored = true
        loadGoodLogic()
      })
      resource.extras.element = element
      element.src = resource.resource.getRemoteUrl()
      element.load()
    })

    //
    // NO IMAGES OR SOUNDS
    //
    if (resourcesImages.length === 0 && resourcesSounds.length === 0) {
      loadedGood()
    }

  }

}

export default GameSpace
