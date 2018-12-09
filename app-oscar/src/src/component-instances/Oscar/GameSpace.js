class X {

  renderCanvas(canvas) {
  
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

  }

}

export default X
