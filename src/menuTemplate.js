const { app, ipcMain } = require("electron");

let template = [
  {
    label: "File",
    submenu: [
      {
        label: "New",
        accelerator: "CmdOrCtrl + N",
        click: (menuItem, browserWindow, event) => {
          browserWindow.webContents.send("create-new-file");
        },
      },
      {
        label: "Save",
        accelerator: "CmdOrCtrl + S",
        click: (menuItem, browserWindow, event) => {
          browserWindow.webContents.send("save-edit-file");
        },
      },
      {
        label: "Search",
        accelerator: "CmdOrCtrl + F",
        click: (menuItem, browserWindow, event) => {
          browserWindow.webContents.send("search-file");
        },
      },
      {
        label: "Import",
        accelerator: "CmdOrCtrl + O",
        click: (menuItem, browserWindow, event) => {
          browserWindow.webContents.send("import-file");
        },
      },
    ],
  },
  {
    label: "Edit",
    submenu: [
      {
        label: "Undo",
        accelerator: "CmdOrCtrl + Z",
        role: "undo",
      },
      {
        label: "Redo",
        accelerator: "Shift + CmdOrCtrl + Z",
        role: "redo",
      },
      {
        type: "separator",
      },
      {
        label: "Cut",
        accelerator: "CmdOrCtrl + X",
        role: "cut",
      },
      {
        label: "Copy",
        accelerator: "CmdOrCtrl + C",
        role: "copy",
      },
      {
        label: "Paste",
        accelerator: "CmdOrCtrl + V",
        role: "paste",
      },
      {
        label: "Select All",
        accelerator: "CmdOrCtrl + A",
        role: "selectall",
      },
    ],
  },
  {
    label: "View",
    submenu: [
      {
        label: "Reload",
        accelerator: "CmdOrCtrl + R",
        click: (item, focusedWindow) => {
          if (focusedWindow) focusedWindow.reload();
        },
      },
      {
        label: "Toggle Fullscreen",
        accelerator: (() => {
          if (process.platform === "darwin") return "Ctrl+Command+F";
          else return "F11";
        })(),
        click: (item, focusedWindow) => {
          if (focusedWindow)
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
        },
      },
      {
        label: "Toggle Devtools",
        accelerator: (() => {
          if (process.platform === "darwin") return "Alt+Command+I";
          else return "Ctrl+Shift+I";
        })(),
        click: (item, focusedWindow) => {
          if (focusedWindow) focusedWindow.toggleDevTools();
        },
      },
    ],
  },
  {
    label: "Window",
    role: "window",
    submenu: [
      {
        label: "Minimize",
        accelerator: "CmdOrCtrl+M",
        role: "minimize",
      },
      {
        label: "Close",
        accelerator: "CmdOrCtrl+W",
        role: "close",
      },
    ],
  },
  {
    label: "Help",
    role: "help",
    submenu: [
      {
        label: "Learn more",
        click: async () => {
          const { shell } = require("electron");
          await shell.openExternal("https://electronjs.org");
        },
      },
    ],
  },
];

if (process.platform === "darwin") {
  const name = app.getName();
  template.unshift({
    label: name,
    submenu: [
      {
        label: `About ${name}`,
        role: "about",
      },
      {
        type: "separator",
      },
      {
        label: "Settings",
        accelerator: "Command+,",
        click: () => {
          ipcMain.emit("open-settings-window");
        },
      },
      {
        label: "Services",
        role: "services",
        submenu: [],
      },
      {
        type: "separator",
      },
      {
        label: `Hide ${name}`,
        accelerator: "Command+H",
        role: "hide",
      },
      {
        label: "HideOthers",
        accelerator: "Command+Alt+H",
        role: "hideothers",
      },
      {
        label: "Unhide",
        role: "unhide",
      },
      {
        type: "separator",
      },
      {
        label: "Quit",
        accelerator: "Command+Q",
        click: () => {
          app.quit();
        },
      },
    ],
  });
} else {
  template[0].submenu.push({
    label: "Settings",
    accelerator: "Ctrl+,",
    click: () => {
      ipcMain.emit("open-settings-window");
    },
  });
}

module.exports = template;
