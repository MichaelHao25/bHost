import React, { useEffect, useState } from 'react'
import { Monaco } from '../../components/Monaco'
import { PasswordModal } from './components/PasswordModal'
import useAppSelector from '../../hooks/useAppSelector'
import { monacoSetState, monacoSlicePassword } from './monacoSlice'
import useAppDispatch from '../../hooks/useAppDispatch'
import { message } from 'antd'

export const MonacoEditor: React.FC = () => {
  const [host, setHost] = useState<string>('')
  const password = useAppSelector(monacoSlicePassword)
  const dispatch = useAppDispatch()
  const [messageApi, contextHolder] = message.useMessage()
  useEffect(() => {
    window.electron.ipcRenderer.invoke('getHostContent').then((res) => {
      setHost(res)
    })
  }, [])
  const handleSave = (host): void => {
    if (password) {
      messageApi.open({
        type: 'loading',
        content: '保存中...',
        duration: 0
      })
      window.electron.ipcRenderer
        .invoke('setHostContent', {
          host,
          password
        })
        .then(() => {
          message.success('保存成功')
        })
        .catch((res) => {
          const errorMessage = res.message || '未知异常'
          message.error(errorMessage)
          if (errorMessage.includes('密码验证失败')) {
            dispatch(
              monacoSetState({
                path: ['passwordVisible'],
                data: true
              })
            )
          }
        })
        .finally(() => {
          messageApi.destroy()
        })
    } else {
      dispatch(
        monacoSetState({
          path: ['passwordVisible'],
          data: true
        })
      )
    }
  }
  return (
    <>
      {contextHolder}
      <Monaco
        value={host}
        onChange={(host): void => setHost(host)}
        onSave={(host): void => {
          handleSave(host)
        }}
      />
      <PasswordModal />
    </>
  )
}
