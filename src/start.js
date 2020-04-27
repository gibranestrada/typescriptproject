"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
var isDev = require("electron-is-dev");
require("electron-reload");
// Module to create native browser window.
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow;
var tray;
function createWindow() {
    // Create the browser window.
    mainWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });
    // and load the index.html of the app.
    mainWindow.loadURL(isDev
        ? 'http://localhost:3000'
        : "file://" + path.join(__dirname, '../build/index.html'));
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
    //     const menuBuilder = new MenuBuilder(mainWindow);
    //    menuBuilder.buildMenu();
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on('ready', function () {
    var iconPath = path.join(__dirname, '../icons/virus1.png');
    tray = new electron_1.Tray(iconPath);
    var contextMenu = electron_1.Menu.buildFromTemplate([
        { label: 'Item1', type: 'radio' },
        { label: 'Item2', type: 'radio' },
        { label: 'Item3', type: 'radio', checked: true },
        { label: 'Item4', type: 'radio' }
    ]);
    tray.setToolTip('My first tray icon app.');
    tray.setContextMenu(contextMenu);
    createWindow();
});
// Quit when all windows are closed.
electron_1.app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
//export default undefined;
