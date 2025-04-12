import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../features/loginState/LoginSlice'

export const store = configureStore({
  reducer: {
    login: loginReducer
  },
})