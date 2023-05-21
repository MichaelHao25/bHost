import { configureStore } from '@reduxjs/toolkit'
import monacoSlice, { IMonacoState } from '../pages/MonacoEditor/monacoSlice'

export const store = configureStore<{
  monaco: IMonacoState
}>({
  reducer: {
    monaco: monacoSlice
  }
})
