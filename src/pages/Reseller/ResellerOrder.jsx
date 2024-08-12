import { Table } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Footer from '~/layouts/Footer/Footer'
import Header from '~/layouts/Header/Header'
import FooterHome from '../Home/FooterHome'
// import { Modal } from 'antd'
// import Require from './Require'

const ResellerOrder = () => {
  const id = useSelector((state) => state.auth._id)
  console.log(id)
  const navigate = useNavigate()
  const handleRouter = () => navigate('/reseller-user')
  const [data, setData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const accessToken = localStorage.getItem('token')
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  // useEffect(() => {
  //   axios
  //     .get(`${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_RESELLER}${id}`)
  //     .then((response) => {
  //       console.log('response123', response)
  //       // if (response && response.data && response.data.data) {
  //       //   const productData = response?.data?.data?.id_orderProduct || []
  //       //   const serviceData = response?.data?.data?.id_orderService || []
  //       //   const combine = [...productData, ...serviceData]
  //       //   const filterData = combine.map((item) => item)
  //       //   console.log('filterData', productData)
  //       //   setData(filterData)
  //       // }
  //       if (response && response.data && response.data.data) {
  //         // const productData = response?.data?.data?.map((a) => a.id_orderProduct || [])
  //         // const serviceData = response?.data?.data?.map((a) => a.id_orderService || [])
  //         // const combine = [...productData, ...serviceData]
  //         // // const filterData = combine.map((item) => item)
  //         // const filterData = combine.filter((item) => item.length > 0)
  //         // console.log('filterData', productData)
  //         // setData(filterData)
  //         setData(response?.data?.data)
  //       }
  //       // if (response && response.data && response.data.data) {
  //       //   const combinedData = response.data.data
  //       //     .filter((item) => item.id_boothProduct === null)
  //       //     .flatMap((item) => [...item.id_orderProduct, ...item.id_orderService])
  //       //   setData(combinedData)
  //       // }
  //       // if (response && response.data && response.data.data) {
  //       //   const combinedData = response.data.data.flatMap((item) => [
  //       //     ...(item.id_orderProduct.length > 0 ? item.id_orderProduct : []),
  //       //     ...(item.id_orderService > 0 ? item.id_orderService : [])
  //       //   ])
  //       //   setData(combinedData)
  //       // }
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }, [])
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_RESELLER}${id}`, {
        headers: {
          'Content-Type': 'application/json',
          token: `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        if (response && response.data && response.data.data) {
          const apiData = response.data.data
          const formattedData = apiData.flatMap((item) => {
            const productOrders = item.id_orderProduct.map((order) => ({
              key: order._id,
              codeOrder: order.codeOrder,
              date: '',
              booth: item.id_boothProduct
                ? item.id_boothProduct.nameBooth
                : item.id_boothService
                  ? item.id_boothService.nameBooth
                  : '',
              quantity: '',
              unitPrice: '',
              total: order.total,
              discount: '',
              commission: item.percent,
              earned: order.refundReseller,
              status: order.status
            }))

            const serviceOrders = item.id_orderService.map((order) => ({
              key: order._id,
              codeOrder: order.codeOrder,
              date: '',
              booth: item.id_boothService
                ? item.id_boothService.nameBooth
                : item.id_boothProduct
                  ? item.id_boothProduct.nameBooth
                  : '',
              quantity: '',
              unitPrice: '',
              total: order.total,
              discount: '',
              commission: item.percent,
              earned: order.refundReseller,
              status: order.status
            }))

            return [...productOrders, ...serviceOrders]
          })

          setData(formattedData.reverse())
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id])
  console.log('data', data)
  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'codeOrder',
      key: 'codeOrder'
    },
    // {
    //   title: 'Ngày mua',
    //   dataIndex: 'date',
    //   key: 'date'
    // },
    {
      title: 'Gian hàng',
      dataIndex: 'booth',
      key: 'booth'
    },
    // {
    //   title: 'Số lượng',
    //   dataIndex: 'quantity',
    //   key: 'quantity'
    // },
    // {
    //   title: 'Đơn giá',
    //   dataIndex: 'unitPrice',
    //   key: 'unitPrice'
    // },
    {
      title: 'Tổng tiền',
      dataIndex: 'total',
      key: 'total'
    },
    // {
    //   title: 'Đã giảm',
    //   dataIndex: 'discount',
    //   key: 'discount'
    // },
    {
      title: 'Chiếc khấu',
      dataIndex: 'commission',
      key: 'commission'
    },
    {
      title: 'Được tiền',
      dataIndex: 'earned',
      key: 'earned'
    },
    {
      title: 'Trạng thái',
      dataIndex: '',
      key: 'status',
      render: (a) => (
        <>
          {a?.status === 'Approved'
            ? 'Đã duyệt'
            : a?.status === 'Pending'
              ? 'Chưa giải quyết'
              : a?.status === 'Cancel'
                ? 'Hủy bỏ'
                : a?.status === 'complain'
                  ? 'Bị phàn nàn'
                  : a?.status === 'Dispute'
                    ? 'Đang tranh chấp'
                    : a?.status === 'Completed'
                      ? 'Hoàn thành'
                      : a?.status === 'Finish'
                        ? 'Kết thúc'
                        : ''}
        </>
      )
    }
  ]
  return (
    <div style={{ backgroundColor: '#f5f5f5' }}>
      <Header />
      <div className='container'>
        <div className='d-flex'>
          <button onClick={handleRouter} type='button' className='bg-orange-order btn btn-primary me-3 px-5 my-3'>
            Danh sách
          </button>
          <button type='button' className='btn-primary-bg-order btn btn-primary btn-primary-blue my-3 ms-3 px-5'>
            Lịch sử
          </button>
        </div>
        <div className='wrap-support p-3 mb-3'>
          <div className='d-flex justify-content-between wrap-head-history align-items-center'>
            <h3>Đơn hàng đã bán</h3>
            {/* <button onClick={showModal} type='button' className='btn btn-primary btn-primary-bg my-3 ms-3'>
              Tạo yêu cầu rút tiền
            </button> */}
          </div>
          {Array.isArray(data) && data.length > 0 ? (
            <div className='wrapper-purchased'>
              <Table className='table-pur' dataSource={data} columns={columns} />
            </div>
          ) : (
            <div className='wrapper-purchased'>
              <div className='text-center'>
                <h2 className='mt-5'>BẠN CHƯA CÓ ĐƠN HÀNG NÀO!</h2>
              </div>
            </div>
          )}
        </div>
        {/* <Modal title='Rút tiền' open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
          <Require />
        </Modal> */}
      </div>
      <FooterHome />
    </div>
  )
}

export default ResellerOrder
