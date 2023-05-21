import { platform } from '@electron-toolkit/utils'
import { readFile, writeFile } from 'fs/promises'
import * as child_process from 'child_process'

/**
 * 获取 hosts 文件路径 失败的话返回false
 */
export const getHostURL = (): string | false => {
  if (platform.isMacOS) {
    return '/etc/hosts'
  } else if (platform.isWindows) {
    return 'C:\\Windows\\System32\\drivers\\etc\\hosts'
  } else if (platform.isLinux) {
    return '/etc/hosts'
  }
  return false
}

/**
 * 获取 hosts 文件内容 失败返回false
 */
export const getHostContent = (): Promise<string | boolean> => {
  const url = getHostURL()
  if (url) {
    return readFile(url).then((res) => {
      return res.toString()
    })
  } else {
    return Promise.reject(false)
  }
}

/**
 * 测试管理员密码是否正确
 * @param password
 */
export const testSudoPassword = (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    child_process.exec(`echo "${password}" | sudo -S ls`, (error, stdout) => {
      if (error) {
        console.log('testSudoPassword', error)
        reject('密码验证失败')
      } else {
        resolve(stdout)
      }
    })
  })
}

interface IUpdateChmodProps {
  password: string
  url: string
  promiseCode: number
}

/**
 * 更新文件权限
 * @param props
 */
export const updateFileChmodPromiseCode = (props: IUpdateChmodProps): Promise<string> => {
  const { password, url, promiseCode } = props
  return new Promise((resolve, reject) => {
    child_process.exec(
      `echo "${password}" | sudo -S chmod ${promiseCode} ${url}`,
      (error, stdout) => {
        if (error) {
          console.log('updateFileChmodPromiseCode', error)
          reject('文件权限更新失败')
        } else {
          resolve(stdout)
        }
      }
    )
  })
}

export interface ISetHostProps {
  /**
   * 更新的host信息
   */
  host: string
  /**
   * 管理员密码
   */
  password: string
}

export const setHostContent = (props: ISetHostProps): Promise<string> => {
  const { host, password } = props
  const hostUrl = getHostURL()

  if (hostUrl) {
    return testSudoPassword(password).then(() => {
      return updateFileChmodPromiseCode({
        password,
        promiseCode: 777,
        url: hostUrl
      })
        .then(() => {
          return writeFile(hostUrl, host)
        })
        .then(() => {
          return updateFileChmodPromiseCode({
            password,
            promiseCode: 644,
            url: hostUrl
          })
        })
        .catch((error) => {
          return Promise.reject(error)
        })
    })
  }
  return Promise.reject('host文件路径获取失败')
}
