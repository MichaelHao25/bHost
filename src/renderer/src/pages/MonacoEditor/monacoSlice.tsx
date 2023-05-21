import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IRootState } from '../../store/IRootState'

export interface IMonacoState {
  /** 密码 */
  password?: string
  /** 是否显示密码 */
  passwordVisible?: boolean
  /** host内容 */
  hostContent?: string
}

export interface ISetState<Path = string, Data = unknown> {
  path: Path[]
  data: Data
}

const localStoragePassword = window.localStorage.getItem('password') || ''
const initialState: IMonacoState = {
  password: localStoragePassword
}
const monacoSlice = createSlice({
  name: 'monacoSlice',
  initialState,
  reducers: {
    setState(state, action: PayloadAction<ISetState>) {
      const {
        payload: { path, data }
      } = action
      if (path[0] === 'password' && typeof data === 'string') {
        window.localStorage.setItem('password', data)
      }
      let tempState = state
      const length = path.length - 1
      path.forEach((key, index) => {
        if (index === length) {
          tempState[key] = data
        } else if (tempState[key]) {
          tempState = tempState[key]
        } else {
          tempState[key] = {}
          tempState = tempState[key]
        }
      })
    }
  }
})

export const { setState: monacoSetState } = monacoSlice.actions
export const monacoSlicePassword: (state: IRootState) => IMonacoState['password'] = (state) =>
  state.monaco.password
export const monacoSliceHostContent: (state: IRootState) => IMonacoState['hostContent'] = (state) =>
  state.monaco.hostContent
export const monacoSlicePasswordVisible: (state: IRootState) => IMonacoState['passwordVisible'] = (
  state
) => state.monaco.passwordVisible

export default monacoSlice.reducer
