import symbol from './files/symbol.png'
import project from './files/project.svg'
import folder from './files/folder.svg'
import user from './files/user.svg'
import preferences from './files/preferences.svg'
import loading from './files/loading.svg'
import projectRun from './files/project-run.svg'
import projectShare from './files/project-share.svg'

import actionEdit from './files/action-edit.svg'
import actionDelete from './files/action-delete.svg'

export default {
  symbol,
  folder,
  user,
  preferences,
  loading,
  actions: {
    edit: actionEdit,
    delete: actionDelete
  },
  project: {
    project,
    run: projectRun,
    share: projectShare
  }
}
