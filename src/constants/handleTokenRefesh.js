import axios from 'axios'
import { updateToken, logout } from './sliceRedux/auth.slice' 
import { jwtDecode } from 'jwt-decode' 

export const handleTokenRefresh = async (dispatch, userId, accessToken, refreshToken) => {
  try {
    const decodedToken = jwtDecode(accessToken) 
    const currentTime = Date.now() / 1000 
    if (decodedToken.exp < currentTime) {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_NEW_ACCESSTOKEN}`,
        { _id: userId },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            refreshtoken: `Bearer ${refreshToken}`
          }
        }
      )

      if (response.status === 200) {
        const { accessToken: newAccessToken } = response.data
        dispatch(
          updateToken({
            newToken: newAccessToken,
            newRefreshToken: refreshToken
          })
        )
      } else {
        dispatch(logout())
      }
    } else {
      console.log('Access token is still valid.')
    }
  } catch (error) {
    dispatch(logout())
  }
}
