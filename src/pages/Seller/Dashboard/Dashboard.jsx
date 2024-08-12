import { faCalendarWeek, faSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import HeaderSell from '~/layouts/HeaderSell/HeaderSell'
import SidebarSell from '~/layouts/SidebarSell/SidebarSell'
import './Dashboard.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { FaDropbox, FaFirstOrder, FaJediOrder, FaServicestack } from 'react-icons/fa'

const Dashboard = () => {
  const id = useSelector((state) => state.auth._id)
  const [totalProduct, setTotalProduct] = useState([])
  const [totalService, setTotalService] = useState([])
  const [orderProduct, setOrderProduct] = useState([])
  const [orderService, setOrderService] = useState([])
  const [transaction, setTransaction] = useState([])
  const [currentMonthOrders, setCurrentMonthOrders] = useState([])
  const [currentMonthTotal, setCurrentMonthTotal] = useState(0)
  const [todayOrders, setTodayOrders] = useState([])
  const [todayTotal, setTodayTotal] = useState(0)
  const [currentMonthOrdersSer, setCurrentMonthOrdersSer] = useState([])
  const [currentMonthTotalSer, setCurrentMonthTotalSer] = useState(0)
  const [todayOrdersSer, setTodayOrdersSer] = useState([])
  const [todayTotalSer, setTodayTotalSer] = useState(0)
  const currentMonth = dayjs().month() + 1
  const accessToken = localStorage.getItem('token')
  const today = dayjs().format('YYYY-MM-DD')
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_BOOTH_USER}${id}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token: `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        if (response && response.data) {
          setTotalProduct(response?.data?.data[0])
          setTotalService(response?.data?.data[1])
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_ORDER_PRODUCT_AGENT}${id}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token: `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        if (response && response.data) {
          setOrderProduct(response?.data?.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_ORDER_SERVICE_AGENT}${id}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token: `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        if (response && response.data) {
          setOrderService(response?.data?.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  useEffect(() => {
    const filteredOrders = orderProduct.filter((order) => {
      if (order.createdAt) {
        const orderMonth = dayjs(order.createdAt).month() + 1
        return orderMonth === currentMonth
      }
    })

    const totalAmount = filteredOrders.reduce((sum, order) => sum + order.total, 0)

    // console.log('filteredOrders', filteredOrders)
    setCurrentMonthOrders(filteredOrders)
    setCurrentMonthTotal(totalAmount)
  }, [orderProduct, currentMonth])
  useEffect(() => {
    const filteredTodayOrders = orderProduct.filter((order) => {
      if (order.createdAt) {
        return dayjs(order.createdAt).format('YYYY-MM-DD') === today
      }
    })
    const totalToday = filteredTodayOrders.reduce((sum, order) => sum + order.total, 0)

    setTodayOrders(filteredTodayOrders)
    setTodayTotal(totalToday)
  }, [orderProduct, today])
  useEffect(() => {
    const filteredOrders = orderService.filter((order) => {
      if (order.createdAt) {
        const orderMonth = dayjs(order.createdAt).month() + 1
        return orderMonth === currentMonth
      }
    })

    const totalAmount = filteredOrders.reduce((sum, order) => sum + order.total, 0)

    console.log('filteredOrdersService', filteredOrders)
    setCurrentMonthOrdersSer(filteredOrders)
    setCurrentMonthTotalSer(totalAmount)
  }, [orderService, currentMonth])
  useEffect(() => {
    const filteredTodayOrders = orderService.filter((order) => {
      if (order.createdAt) {
        return dayjs(order.createdAt).format('YYYY-MM-DD') === today
      }
    })
    const totalToday = filteredTodayOrders.reduce((sum, order) => sum + order.total, 0)

    setTodayOrdersSer(filteredTodayOrders)
    setTodayTotalSer(totalToday)
  }, [orderService, today])
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_TRANSACTION_BY_USER}${id}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token: `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        console.log('response', response)

        if (response && response.data) {
          setTransaction(response?.data?.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <div className=''>
      <HeaderSell />
      <div className='w-100 d-flex'>
        <SidebarSell />
        <div className='w-100'>
          <div>
            {/* <div className='d-flex flex-wrap justify-content-between'> */}
            <div className='row mt-5 mt-xl-0'>
              <div className='col-12 col-md-6 col-lg-3 mt-3 mt-md-0'>
                <div className='item-dashboard px-3 py-4 mb-3'>
                  <div className='d-flex align-items-center justify-content-between'>
                    <div className='d-flex flex-column'>
                      <h4>{totalProduct.length}</h4>
                      <p>Tổng gian hàng sản phẩm</p>
                    </div>
                    <FontAwesomeIcon className='fs-3 ms-3' icon={faCalendarWeek} />
                  </div>
                  <Link to={'/store/management'} className='text-center d-block mt-3 fs-6'>
                    Xem thêm
                  </Link>
                </div>
              </div>
              <div className='col-12 col-md-6 col-lg-3'>
                <div className='item-dashboard px-3 py-4 mb-3'>
                  <div className='d-flex align-items-center justify-content-between'>
                    <div className='d-flex flex-column'>
                      <h4>{totalService.length}</h4>
                      <p>Tổng gian hàng dịch vụ</p>
                    </div>
                    {/* <FontAwesomeIcon className='fs-3 ms-3' icon={FaDropbox} /> */}
                    <FaDropbox className='fs-3 ms-3' />
                  </div>
                  <Link to={'/store/management'} className='text-center d-block mt-3 fs-6'>
                    Xem thêm
                  </Link>
                </div>
              </div>
              <div className='col-12 col-md-6 col-lg-3'>
                <div className='item-dashboard px-3 py-4 mb-3'>
                  <div className='d-flex align-items-center justify-content-between'>
                    <div className='d-flex flex-column'>
                      <h4>{orderProduct.length}</h4>
                      <p>Tổng đơn hàng sản phẩm</p>
                    </div>
                    {/* <FontAwesomeIcon className='fs-3 ms-3' icon={faCalendarWeek} /> */}
                    <FaFirstOrder className='fs-3 ms-3' />
                  </div>
                  <Link to={'/store/product'} className='text-center d-block mt-3 fs-6'>
                    Xem thêm
                  </Link>
                </div>
              </div>
              <div className='col-12 col-md-6 col-lg-3'>
                <div className='item-dashboard px-3 py-4 mb-3'>
                  <div className='d-flex align-items-center justify-content-between'>
                    <div className='d-flex flex-column'>
                      <h4>{orderService.length}</h4>
                      <p>Tổng đơn hàng dịch vụ</p>
                    </div>
                    {/* <FontAwesomeIcon className='fs-3 ms-3' icon={faCalendarWeek} /> */}
                    <FaJediOrder className='fs-3 ms-3' />
                  </div>
                  <Link to={'/store/service'} className='text-center d-block mt-3 fs-6'>
                    Xem thêm
                  </Link>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6 col-12 d-flex justify-content-center'>
                <div className='wrap-item-statistical px-3 py-4 w-100'>
                  <h6>Thống kê đơn hàng sản phẩm</h6>
                  <div className='d-flex justify-content-between align-items-center mb-3'>
                    {/* <p>Hôm nay: </p>
                  <p>13 Đơn</p>
                  <p>1500000 VND</p> */}
                    <p>Hôm nay </p>
                    <div className='d-flex flex-column'>
                      <p>{todayOrders.length} Đơn</p>
                      <p>{todayTotal.toLocaleString()} VND</p>
                    </div>
                  </div>
                  <div className='d-flex justify-content-between align-items-center'>
                    <p>Tháng {currentMonth} </p>
                    <div className='d-flex flex-column'>
                      <p>{currentMonthOrders.length} Đơn</p>
                      <p>{currentMonthTotal.toLocaleString()} VND</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-md-6 col-12 d-flex justify-content-center'>
                <div className='wrap-item-statistical px-3 py-4 w-100'>
                  <h6>Thống kê đơn hàng dịch vụ</h6>
                  <div className='d-flex justify-content-between align-items-center mb-3'>
                    <p>Hôm nay </p>
                    <div className='d-flex flex-column'>
                      <p>{todayOrdersSer.length} Đơn</p>
                      <p>{todayTotalSer.toLocaleString()} VND</p>
                    </div>
                  </div>
                  <div className='d-flex justify-content-between align-items-center'>
                    <p>Tháng {currentMonth} </p>
                    <div className='d-flex flex-column'>
                      <p>{currentMonthOrdersSer.length} Đơn</p>
                      <p>{currentMonthTotalSer.toLocaleString()} VND</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='table-responsive mt-4'>
              <table className='table'>
                <thead>
                  <tr className='custom-header'>
                    <th scope='col'>Loại</th>
                    <th scope='col'>Lý do</th>
                    <th scope='col'>Số tiền</th>
                    <th scope='col'>Thời gian</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(transaction) && transaction?.length > 0 ? (
                    transaction.map((a, i) => (
                      <tr key={i} className='mb-2'>
                        <td className='service-booth'>{a?.type}</td>
                        <td>{a?.reason}</td>
                        <td className='service-booth'>{a?.amount?.toLocaleString()}</td>
                        {/* <td>{a.items}</td> */}
                        <td>{moment(a?.createdAt).format('DD-MM-YYYY HH:mm')}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan='15' className='text-center'>
                        Không tìm thấy đơn hàng phù hợp
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
