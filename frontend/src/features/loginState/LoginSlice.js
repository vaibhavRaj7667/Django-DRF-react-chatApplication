import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: 'login',
  }
  
  export const LoginSlice = createSlice({
    name: 'login',

    initialState,

    reducers: {
      LoginState: (state) => {
        state.mode = 'login'
      },

      SignupState: (state) => {
        state.mode = 'signup'
      },
      
    },
  })


export const {LoginState, SignupState} = LoginSlice.actions
export default LoginSlice.reducer