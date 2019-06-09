const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');
const Menu = require('electron').Menu;
const elec = require('electron');
const ipcRenderer = require('electron').ipcRenderer;

function createWindow() {
  let win = new BrowserWindow({
    width: 1000,
    height: 1000,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.webContents.on('did-finish-load', () => {
    win.setTitle('Geometry dots and lines stuff');
  });

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  win.on('closed', () => {
    win = null;
  })
};

app.on('ready', () => {
  createWindow();

  const template = [
    { role: 'quit' },
    {
      label: 'Clear',
      click: function () {
        let focusedWindow = BrowserWindow.getFocusedWindow();
        focusedWindow.webContents.executeJavaScript(
          `
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        dots=[];
          `, (res) => {
            console.log(res);
          });
      }
    },
    {
      label: 'Help',
      click: function () {
        elec.shell.openExternal('https://www.youtube.com/watch?v=mK2fNG26xFg');
      }
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

});