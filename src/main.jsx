import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '~/App'
import store from './constants/sliceRedux/store'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'
import { I18nextProvider } from 'react-i18next'
import i18n from './config/i18/i18n'
import axios from 'axios'
const clientId = import.meta.env.VITE_API_URL_CLIENT_ID
// console.log('clientId', clientId)
const accessToken = localStorage.getItem('token')
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchInterval: 1000 * 60 * 5,
      refetchIntervalInBackground: true
    }
  }
})
// axios.defaults.headers.post['Content-Type'] = 'application/json'

// axios.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token') // Lấy token mới nhất từ localStorage mỗi khi có request
//     if (token) {
//       // config.headers['Content-Type'] = 'application/json'
//       config.headers['Authorization'] = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <GoogleOAuthProvider clientId={clientId}>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </GoogleOAuthProvider>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
)
