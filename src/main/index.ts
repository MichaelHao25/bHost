import { app, BrowserWindow, Menu, nativeImage, shell, Tray } from 'electron'
import { join } from 'path'
import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import trayIcon from '../../resources/tray.png?asset'

import ipcMainEvent from './ipcMainEvent'

ipcMainEvent()
let tray: Tray | null = null

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    backgroundColor: '#fff',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.dock.hide()

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  /**
   * 更改所有请求的请求头
   * */
  // const xxx_filter = {
  //   urls: ['*://*/*']
  // }
  // session.defaultSession.webRequest.onBeforeSendHeaders(xxx_filter, (details, callback) => {
  //   details.requestHeaders[
  //     'user-agent'
  //   ] = `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36`
  //   callback({ requestHeaders: details.requestHeaders })
  // })
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron.bHost')
  const icon = nativeImage.createFromPath(trayIcon)
  tray = new Tray(icon)
  tray.setToolTip('点击显示bHost')
  // tray.setTitle('bHost')
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '退出',
      type: 'normal',
      click: (): void => {
        app.quit()
      }
    }
  ])
  tray.on('click', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  tray.setContextMenu(contextMenu)
  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
