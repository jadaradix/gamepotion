const isActionConfigurable = (actionClassInstance) => {
  return actionClassInstance.defaultRunArguments.size > 0 || actionClassInstance.caresAboutAppliesTo === true
}

export default isActionConfigurable