import getProjects from './get'

export default async function (state) {
  const currentProject = null
  return Promise.resolve({
    ...state,
    currentProject
  })
}
