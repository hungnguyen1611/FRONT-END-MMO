import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import { AuthProvider } from './contexts/authContext'
import Product from './pages/Product/Product'
import Detail from './pages/Detail/Detail'
import Share from './pages/Share/Share'
import DetailPost from './pages/DetailPost'
import Support from './pages/Subport/Support'
import ChangePass from './pages/ChangePass/ChangePass'
import PurchasedOrder from './pages/PurchasedOrder/PurchasedOrder'
import RegisterStore from './pages/RegisterStore/RegisterStore'
import HistoryMoney from './pages/HistoryMoney/HistoryMoney'
import Information from './pages/Information'
import Withdraw from './pages/Withdraw/Withdraw'
import FavoriteStall from './pages/FavoriteStall/FavoriteStall'
import StoreManagement from './pages/Seller/StoreManagement/StoreManagement'
import StoreProduct from './pages/Seller/StoreProduct/StoreProduct'
import StoreService from './pages/Seller/StoreService/StoreService'
import DetailService from './pages/Seller/StoreService/DetailService'
import ConfirmService from './pages/Seller/StoreService/ConfirmService'
import TransactionService from './pages/Seller/StoreService/TransactionService'
import AddStore from './pages/Seller/StoreManagement/AddStore/addStore'
import SalesStore from './pages/Seller/StoreManagement/Salesstore/SalesStore'
import StoreReserve from './pages/Seller/StoreReserve/StoreReserve'
import StoreComplain from './pages/Seller/StoreComplain/StoreComplain'
import StoreReseller from './pages/Seller/StoreReseller/StoreReseller'
import StoreEvaluate from './pages/Seller/StoreEvaluate/StoreEvaluate'
import StoreCoupon from './pages/Seller/StoreCoupon/StoreCoupon'
import Blog from './pages/Blog/Blog'
import NewBlog from './pages/Blog/NewBlog'
// import Message from './pages/Message/message'
import VerifyEmail from './pages/VerifyEmail/VerifyEmail'
import NotFound from './components/manager/NotFound'
import Reseller from './pages/Reseller/Reseller'
import ResellerOrder from './pages/Reseller/ResellerOrder'
import EditStore from './pages/Seller/StoreManagement/AddStore/EditStore'
import CancelService from './pages/Seller/StoreService/CancelService'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { handleTokenRefresh } from './constants/handleTokenRefesh'
import { logout } from './constants/sliceRedux/auth.slice'
import DetailSeller from './pages/Detail/DetailSeller'
import BoothUser from './pages/BoothUser/BoothUser'
import Banking from './pages/Banking/Banking'
import SearchResults from './pages/Home/SearchResults'
import Dashboard from './pages/Seller/Dashboard/Dashboard'
import OneSignal from './pages/Seller/OneSignal/OneSignal'
import { TonConnectUIProvider } from '@tonconnect/ui-react'

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const token = useSelector((state) => state.auth.token)
  const refreshToken = useSelector((state) => state.auth.refreshToken)
  const userId = useSelector((state) => state.auth._id)
  const dispatch = useDispatch()
  const role = useSelector((state) => state.auth.role || 'defaultRole')

  // Bỏ qua lỗi liên quan đến play.google.com/log
  const originalConsoleError = console.error
  console.error = function (msg) {
    if (msg && typeof msg === 'string' && msg.includes('https://play.google.com/log?format=json')) {
    } else {
      originalConsoleError.apply(console, arguments)
    }
  }

  async function initializeOneSignal() {
    try {
      await OneSignal.init({
        appId: 'eefcca45-d9a3-4b2a-bbe6-0941a4a7b006',
        allowLocalhostAsSecureOrigin: true
      })
      OneSignal.Debug.setLogLevel('trace')
      await OneSignal.Slidedown.promptPush()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    initializeOneSignal()
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/OneSignalSDKWorker.js')
        .then(function (registration) {
          console.log('Service Worker registered with scope:', registration.scope)
        })
        .catch(function (error) {
          console.log('Service Worker registration failed:', error)
        })
    }
    if (Notification.permission === 'granted') {
      console.log('Notification permission granted.')
    } else if (Notification.permission === 'denied') {
      console.log('Notification permission denied.')
    } else {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.')
        } else {
          console.log('Notification permission denied.')
        }
      })
    }
  })

  useEffect(() => {
    if (isLoggedIn) {
      const interval = setInterval(
        async () => {
          if (token && refreshToken && userId) {
            try {
              await handleTokenRefresh(dispatch, userId, token, refreshToken)
            } catch (error) {
              console.error('Lỗi làm mới token:', error)
              dispatch(logout())
              alert('Token không có quyền đăng nhập. Vui lòng đăng nhập lại.')
            }
          }
        },
        1000 * 60 * 5
      )

      return () => {
        clearInterval(interval)
      }
    }
  }, [isLoggedIn, token, refreshToken, userId, dispatch])

  return (
    <TonConnectUIProvider
      manifestUrl='https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json'
      walletsListConfiguration={{
        includeWallets: [
          {
            appName: 'tonwallet',
            name: 'TON Wallet',
            imageUrl: 'https://wallet.ton.org/assets/ui/qr-logo.png',
            aboutUrl: 'https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd',
            universalLink: 'https://wallet.ton.org/ton-connect',
            jsBridgeKey: 'tonwallet',
            bridgeUrl: 'https://bridge.tonapi.io/bridge',
            platforms: ['chrome', 'android']
          },
          {
            appName: 'nicegramWallet',
            name: 'Nicegram Wallet',
            imageUrl: 'https://static.nicegram.app/icon.png',
            aboutUrl: 'https://nicegram.app',
            universalLink: 'https://nicegram.app/tc',
            deepLink: 'nicegram-tc://',
            jsBridgeKey: 'nicegramWallet',
            bridgeUrl: 'https://bridge.tonapi.io/bridge',
            platforms: ['ios', 'android']
          },
          {
            appName: 'binanceTonWeb3Wallet',
            name: 'Binance Web3 Wallet',
            imageUrl:
              'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjMEIwRTExIi8+CjxwYXRoIGQ9Ik01IDE1TDcuMjU4MDYgMTIuNzQxOUw5LjUxNjEzIDE1TDcuMjU4MDYgMTcuMjU4MUw1IDE1WiIgZmlsbD0iI0YwQjkwQiIvPgo8cGF0aCBkPSJNOC44NzA5NyAxMS4xMjlMMTUgNUwyMS4xMjkgMTEuMTI5TDE4Ljg3MSAxMy4zODcxTDE1IDkuNTE2MTNMMTEuMTI5IDEzLjM4NzFMOC44NzA5NyAxMS4xMjlaIiBmaWxsPSIjRjBCOTBCIi8+CjxwYXRoIGQ9Ik0xMi43NDE5IDE1TDE1IDEyLjc0MTlMMTcuMjU4MSAxNUwxNSAxNy4yNTgxTDEyLjc0MTkgMTVaIiBmaWxsPSIjRjBCOTBCIi8+CjxwYXRoIGQ9Ik0xMS4xMjkgMTYuNjEyOUw4Ljg3MDk3IDE4Ljg3MUwxNSAyNUwyMS4xMjkgMTguODcxTDE4Ljg3MSAxNi42MTI5TDE1IDIwLjQ4MzlMMTEuMTI5IDE2LjYxMjlaIiBmaWxsPSIjRjBCOTBCIi8+CjxwYXRoIGQ9Ik0yMC40ODM5IDE1TDIyLjc0MTkgMTIuNzQxOUwyNSAxNUwyMi43NDE5IDE3LjI1ODFMMjAuNDgzOSAxNVoiIGZpbGw9IiNGMEI5MEIiLz4KPC9zdmc+Cg==',
            aboutUrl: 'https://www.binance.com/en/web3wallet',
            deepLink: 'bnc://app.binance.com/cedefi/ton-connect',
            bridgeUrl: 'https://bridge.tonapi.io/bridge',
            platforms: ['chrome', 'safari', 'ios', 'android'],
            universalLink: 'https://app.binance.com/cedefi/ton-connect'
          }
        ]
      }}
      actionsConfiguration={{
        twaReturnUrl: 'https://t.me/DemoDappWithTonConnectBot/demo'
      }}
    >
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/search-results' element={<SearchResults />} />
            {/* <Route path='/reseller/booth=:id_booth&reseller=:id_reseller' element={<DetailSeller />} /> */}
            <Route path='/reseller/*' element={<DetailSeller />} />
            <Route path='/users/:id/verify/:token' element={<VerifyEmail />} />
            <Route path='/:name_business/type/:name_type' element={<Product />} />
            <Route path='/blog' element={isLoggedIn ? <Blog /> : <Navigate to='/login' />} />
            <Route path='/blog/new' element={isLoggedIn ? <NewBlog /> : <Navigate to='/login' />} />
            <Route path='/detail/:id_business/booth/:id_booth' element={<Detail />} />
            <Route path='/booth/user/:id_user' element={<BoothUser />} />
            {/* <Route path='/reseller/booth=:id_booth&reseller=:id_reseller' element={<DetailSeller />} /> */}

            {/* <Route path='/reseller/booth/:id_booth/reseller/:id_reseller' element={<DetailSeller />} /> */}
            <Route path='/share' element={<Share />} />
            <Route path='/detailpost/:id_post' element={<DetailPost />} />
            <Route path='/support' element={<Support />} />
            <Route path='/change/password' element={isLoggedIn ? <ChangePass /> : <Navigate to='/login' />} />
            <Route path='/purchased' element={isLoggedIn ? <PurchasedOrder /> : <Navigate to='/login' />} />
            <Route
              path='/register-store'
              // element={isLoggedIn && role === 'user' ? <RegisterStore /> : <Navigate to='/login' />}
              element={<RegisterStore />}
            />
            <Route path='/history-money' element={isLoggedIn ? <HistoryMoney /> : <Navigate to='/login' />} />
            <Route path='/information' element={isLoggedIn ? <Information /> : <Navigate to='/login' />} />
            <Route path='/withdraw' element={isLoggedIn ? <Withdraw /> : <Navigate to='/login' />} />
            <Route path='/favorite' element={isLoggedIn ? <FavoriteStall /> : <Navigate to='/login' />} />
            <Route path='/reseller-user' element={isLoggedIn ? <Reseller /> : <Navigate to='/login' />} />
            <Route path='/reseller-order' element={isLoggedIn ? <ResellerOrder /> : <Navigate to='/login' />} />
            <Route
              path='/store/management'
              element={isLoggedIn && role === 'agent' ? <StoreManagement /> : <Navigate to='/login' />}
            />
            <Route
              path='/store/product'
              element={isLoggedIn && role === 'agent' ? <StoreProduct /> : <Navigate to='/login' />}
            />
            <Route
              path='/store/service'
              element={isLoggedIn && role === 'agent' ? <StoreService /> : <Navigate to='/login' />}
            />
            <Route
              path='/store/onesignal'
              element={isLoggedIn && role === 'agent' ? <OneSignal /> : <Navigate to='/login' />}
            />
            <Route
              path='/store/reserve'
              element={isLoggedIn && role === 'agent' ? <StoreReserve /> : <Navigate to='/login' />}
            />
            <Route
              path='/store/complain'
              element={isLoggedIn && role === 'agent' ? <StoreComplain /> : <Navigate to='/login' />}
            />
            <Route
              path='/store/reseller'
              element={isLoggedIn && role === 'agent' ? <StoreReseller /> : <Navigate to='/login' />}
            />
            <Route
              path='/store/Evaluate'
              element={isLoggedIn && role === 'agent' ? <StoreEvaluate /> : <Navigate to='/login' />}
            />
            <Route
              path='/store/coupon'
              element={isLoggedIn && role === 'agent' ? <StoreCoupon /> : <Navigate to='/login' />}
            />
            <Route
              path='/store/:id_business/detail/:id_order'
              element={isLoggedIn && role === 'agent' ? <DetailService /> : <Navigate to='/login' />}
            />
            <Route
              path='/store/:id_business/confirm/:id_order'
              element={isLoggedIn && role === 'agent' ? <ConfirmService /> : <Navigate to='/login' />}
            />
            <Route
              path='/store/:id_business/transaction/:id_order'
              element={isLoggedIn && role === 'agent' ? <TransactionService /> : <Navigate to='/login' />}
            />
            <Route
              path='/store/:id_business/cancel/:id_order'
              element={isLoggedIn && role === 'agent' ? <CancelService /> : <Navigate to='/login' />}
            />
            <Route
              path='/store/management/addstore'
              element={isLoggedIn && role === 'agent' ? <AddStore /> : <Navigate to='/login' />}
            />
            <Route
              path='/store/management/edit-store'
              element={isLoggedIn && role === 'agent' ? <EditStore /> : <Navigate to='/login' />}
            />
            <Route
              path='/store/management/salesstore'
              element={isLoggedIn && role === 'agent' ? <SalesStore /> : <Navigate to='/login' />}
            />
            <Route
              path='/store/dashboard'
              element={isLoggedIn && role === 'agent' ? <Dashboard /> : <Navigate to='/login' />}
            />
            {/* <Route path='/message' element={<Message />} /> */}
            {/* <Route path='/message' element={isLoggedIn ? <Message /> : <Navigate to='/login' />} /> */}
            <Route path='/banking' element={isLoggedIn ? <Banking /> : <Navigate to='/login' />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TonConnectUIProvider>
  )
}

export default App
