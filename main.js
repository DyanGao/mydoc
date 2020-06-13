const {
  app,
  Menu,
  ipcMain
} = require("electron");
const isDev = require("electron-is-dev");
const path = require('path');
const menuTemplate = require('./src/menuTemplate');
const AppWindow = require('./src/AppWindow')
let mainWindow, settingsWindow;

app.on("ready", () => {
  /* mainWindow = new BrowserWindow({
    width: 1024,
    height: 680,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true 
    },*/
  const mainWindowConfig = {
    width: 1024,
    height: 680,
  }

  const urlLocation = isDev ? "http://localhost:3000" : "dummyurl";
  mainWindow = new AppWindow(mainWindowConfig, urlLocation)
  mainWindow.on('closed', () => {
    mainWindow = null
  })
  //mainWindow.loadURL(urlLocation);
  //hook up main events
  ipcMain.on('open-settings-window', () => {
    const settingsWindowConfig = {
      width: 500,
      height: 400,
      parent: mainWindow,


    }
    const settingsFileLocation = `file://${path.join(__dirname, './settings/settings.html')}`
    settingsWindow = new AppWindow(settingsWindowConfig, settingsFileLocation)
    settingsWindow.on('closed', () => {
      settingsWindow = null
    })
  })
  //set the menu
  const menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)
});