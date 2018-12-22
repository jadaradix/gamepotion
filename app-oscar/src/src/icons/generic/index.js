import symbol from './files/symbol.png'
import home from './files/home.svg'
import folder from './files/folder.svg'
import account from './files/account.svg'
import team from './files/team.svg'
import teamMember from './files/team-member.svg'
import store from './files/store.svg'
import preferences from './files/preferences.svg'
import loading from './files/loading.svg'
import modalClose from './files/modal-close.svg'

import upload from './files/upload.svg'
import uploadInProgress from './files/upload-in-progress.svg'
import uploadDone from './files/upload-done.svg'
import uploadErrored from './files/upload-errored.svg'

import actionLoad from './files/action-load.svg'
import actionAdd from './files/action-add.svg'
import actionEdit from './files/action-edit.svg'
import actionDelete from './files/action-delete.svg'

import project from './files/project.svg'
import projectNew from './files/project-new.svg'
import projectRun from './files/project-run.svg'
import projectShare from './files/project-share.svg'

import resourceSoundPlay from './files/resource-sound-play.svg'
import resourceSoundStop from './files/resource-sound-stop.svg'

export default {
  symbol,
  home,
  folder,
  account,
  team,
  teamMember,
  store,
  preferences,
  loading,
  modalClose,
  upload,
  uploadInProgress,
  uploadDone,
  uploadErrored,
  actions: {
    load: actionLoad,
    add: actionAdd,
    edit: actionEdit,
    delete: actionDelete
  },
  project: {
    project,
    new: projectNew,
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
