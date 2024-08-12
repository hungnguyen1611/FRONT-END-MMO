// store.js
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '~/constants/sliceRedux/auth.slice'

const store = configureStore({
  reducer: {
    auth: authReducer
  }
})

export default store
