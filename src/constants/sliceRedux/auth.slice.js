import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: localStorage.getItem('token') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  _id: localStorage.getItem('_id') || null,
  isLoggedIn: !!localStorage.getItem('token'),
  role: localStorage.getItem('role') || '',
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state._id = action.payload._id
      state.isLoggedIn = true
      state.role = action.payload.role
      state.error = null

      localStorage.setItem('token', action.payload.accessToken)
      localStorage.setItem('refreshToken', action.payload.refreshToken)
      localStorage.setItem('_id', action.payload._id)
      localStorage.setItem('role', action.payload.role)
    },
    logout(state) {
      state.token = null
      state.refreshToken = null
      state._id = null
      state.isLoggedIn = false
      state.role = ''
      state.error = null

      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('_id')
      localStorage.removeItem('role')
    },
    updateToken(state, action) {
      state.token = action.payload.newToken
      state.refreshToken = action.payload.newRefreshToken
      localStorage.setItem('token', action.payload.newToken)
      localStorage.setItem('refreshToken', action.payload.newRefreshToken)
    },
    setError(state, action) {
      state.error = action.payload
    }
  }
})

export const { login, logout, updateToken, setError } = authSlice.actions
export default authSlice.reducer
