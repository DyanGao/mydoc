const {
  dialog
} = window.require('electron').remote;
const {
  remote
} = window.require("electron");
const Store = require('electron-store');
const settingsStore = new Store({
  name: 'Settings'
})

const $ = (id) => {
  return document.getElementById(id)
}

document.addEventListener('DOMContentLoaded', () => {
  let savedLocation = settingsStore.get('savedFileLoaction')
  if (savedLocation) {
    $('saved-file-location').value = savedLocation
  }
  $('select-new-location').addEventListener('click', () => {
    dialog.showOpenDialog({
      properties: ['openDirectory'],
      message: 'please choose file path',
    }).then(result => {
      if (Array.isArray(result.filePaths)) {
        $('saved-file-location').value = result.filePaths[0]
        savedLocation = result.filePaths[0]
      }
    })
  })
  $('settings-form').addEventListener('submit', () => {
    settingsStore.set('savedFileLoaction', savedLocation)
    remote.getCurrentWindow().close()
  })
})