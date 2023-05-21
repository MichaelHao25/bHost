import { ipcMain } from 'electron'
import * as os from 'os'
import { getHostContent, setHostContent } from '../hostUtils'

const ipcMainEvent = (): void => {
  ipcMain.handle('getUser', () => {
    return os.userInfo().username
  })
  ipcMain.handle('getHostContent', () => {
    return getHostContent()
  })

  ipcMain.handle('setHostContent', (_, args) => {
    const { password, host } = args
    return setHostContent({ host, password })
  })
}

export default ipcMainEvent
