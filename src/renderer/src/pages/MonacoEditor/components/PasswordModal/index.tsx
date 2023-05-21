import React, { useEffect, useState } from 'react'
import { Input, Modal, ModalProps } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { PasswordProps } from 'antd/es/input'
import useAppDispatch from '../../../../hooks/useAppDispatch'
import useAppSelector from '../../../../hooks/useAppSelector'
import { monacoSetState, monacoSlicePasswordVisible } from '../../monacoSlice'

export const PasswordModal: React.FC = () => {
  const dispatch = useAppDispatch()
  const passwordVisible = useAppSelector(monacoSlicePasswordVisible)
  const [inputPassword, setInputPassword] = useState<string>('')
  const [user, setUser] = useState<string>('loading...')
  useEffect(() => {
    window.electron.ipcRenderer.invoke('getUser').then((user) => {
      setUser(user)
    })
  }, [])
  const handlePasswordCallback = (password: string): void => {
    dispatch(
      monacoSetState({
        path: ['password'],
        data: password
      })
    )
    dispatch(
      monacoSetState({
        path: ['passwordVisible'],
        data: false
      })
    )
  }

  const handleOnOk: ModalProps['onOk'] = () => {
    if (handlePasswordCallback) {
      handlePasswordCallback(inputPassword)
    }
  }
  const onPressEnter: Required<PasswordProps>['onPressEnter'] = () => {
    if (handlePasswordCallback) {
      handlePasswordCallback(inputPassword)
    }
  }
  const iconRender: Required<PasswordProps>['iconRender'] = (visible) =>
    visible ? <EyeTwoTone rev={undefined} /> : <EyeInvisibleOutlined rev={undefined} />
  const onChange: Required<PasswordProps>['onChange'] = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setInputPassword(e.target.value)
  }
  return (
    <Modal
      width={400}
      open={passwordVisible}
      title={`请输入(${user})的密码`}
      okText="好的"
      cancelText="取消"
      onCancel={(): void => {
        dispatch(
          monacoSetState({
            path: ['passwordVisible'],
            data: false
          })
        )
      }}
      onOk={handleOnOk}
    >
      <Input.Password
        value={inputPassword}
        onChange={onChange}
        onPressEnter={onPressEnter}
        iconRender={iconRender}
      />
    </Modal>
  )
}
