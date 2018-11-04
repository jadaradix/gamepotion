import symbol from './files/symbol.png'
import folder from './files/folder.svg'
import preferences from './files/preferences.svg'
import loading from './files/loading.svg'

import upload from './files/upload.svg'
import uploadInProgress from './files/upload-in-progress.svg'
import uploadDone from './files/upload-done.svg'

import actionAdd from './files/action-add.svg'
import actionEdit from './files/action-edit.svg'
import actionDelete from './files/action-delete.svg'

import project from './files/project.svg'
import projectRun from './files/project-run.svg'
import projectShare from './files/project-share.svg'

import resourceSoundPlay from './files/resource-sound-play.svg'
import resourceSoundStop from './files/resource-sound-stop.svg'

export default {
  symbol,
  folder,
  preferences,
  loading,
  upload,
  uploadInProgress,
  uploadDone,
  actions: {
    add: actionAdd,
    edit: actionEdit,
    delete: actionDelete
  },
  project: {
    project,
    run: projectRun,
    share: projectShare
  },
  resource: {
    sound: {
      play: resourceSoundPlay,
      stop: resourceSoundStop
    }
  }
}
