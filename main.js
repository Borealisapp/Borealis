'use strict';

const {app, nativeImage, BrowserWindow, Menu, Tray} = require('electron');
const path = require('path')

let dev = false;
if(process.argv.indexOf("--dev") !== -1) {
    dev = true;
}

var favicon;
if(dev) favicon = path.join(__dirname, '/public/favicon.ico')
else favicon = path.join(__dirname, '/build/favicon.ico')
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        show: false, title:"Borealis", icon: favicon
    });

    let indexPath;
    mainWindow.loadURL(dev ? 'http://localhost:3000' : `file://${path.join(__dirname, '/build/index.html')}`);
    if(dev){
        const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');
        installExtension(REACT_DEVELOPER_TOOLS).then(console.log).catch(console.error);
    }
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        if ( dev ) {
            mainWindow.webContents.openDevTools();
        }
    });
    mainWindow.on('closed', ()=>{mainWindow=null;});
}
var tray = null;
app.on('ready', ()=>{
    tray = new Tray(favicon);
    const menu = Menu.buildFromTemplate([
           {label: "Quit", click: (item, window, event) => {
               app.quit();
           }},
    ]);
    tray.setToolTip("Borealis");
    tray.setContextMenu(menu);
    tray.on('click', (event, bounds, position)=>{
        if(mainWindow !== null) {
            mainWindow.show();
        } else {
            createWindow();
        }
    });
    createWindow();
});



app.on('window-all-closed', () => {});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
