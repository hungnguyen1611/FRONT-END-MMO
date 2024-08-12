import HeaderSell from '~/layouts/HeaderSell/HeaderSell'
import SidebarSell from '~/layouts/SidebarSell/SidebarSell'
import success from '~/assets/img/cancel.png'
import LazyImage from '~/hooks/LazyImage/LazyImage'
import { Steps, Modal } from 'antd'
import { useEffect, useState } from 'react'
import ModalDetail from './ModalDetail'
import ModalConfirm from './ModalConfirm'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ModalCancel from './ModalCancel'
import NotFound from '~/components/manager/NotFound'

const CancelService = () => {
  const { id_business, id_order } = useParams()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalCancel, setIsModalCancel] = useState(false)
  const accessToken = localStorage.getItem('token')
  const [data, setData] = useState([])
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const handleCancelModal = () => {
    setIsModalCancel(false)
  }
  useEffect(() => {
    let api = null
    if (id_business === import.meta.env.VITE_API_URL_API_ID_PRODUCT) {
      api = import.meta.env.VITE_API_URL_API_ORDER_PRODUCT
    } else {
      api = import.meta.env.VITE_API_URL_API_ORDER_SERVICE
    }
    axios
      .get(`${import.meta.env.VITE_API_URL_BACKEND_URL}${api}${id_order}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token: `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        console.log('response', response)
        if (response && response.data) {
          setData(response?.data?.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id_order])
  return (
    <>
      {data?.status === 'Cancel' ? (
        <div className=''>
          <HeaderSell />
          <div className='w-100 d-flex'>
            <SidebarSell />
            <div className='border mt-5 mt-lg-0 p-2 container'>
              <h2 className='mb-5 text-center heading-detail-service'>Chi tiết đơn hàng {data?.codeOrder}</h2>

              <div className='row'>
                <div className='col-12 col-md-6 mt-3'>
                  <div className='d-flex flex-column align-items-center'>
                    <LazyImage className='wrap-image-detail-service mb-3' src={success} alt='face' />
                    <h4>Đã hủy</h4>
                    <p className='mb-3'>Đơn hàng đã được bạn hủy</p>
                  </div>
                  {/* <div className='text-center'>
                    <h5 style={{ color: 'red' }}>Lí do bị hủy: {data?.contentCancel}</h5>
                  </div> */}
                  <div className='text-start w-100'>
                    <h4 style={{ color: 'red' }}>Lí do bị hủy:</h4>
                    <pre className='fs-5' style={{ color: 'red', whiteSpace: 'pre-wrap' }}>
                      {data?.contentCancel}
                    </pre>
                  </div>
                </div>
                <div className='col-12 col-md-6 mt-3'>
                  {/* <h4>Bên mua yêu cầu hoàn thành trong 7 ngày</h4>
              <p className='mb-4'>Tính từ ngày tạo đơn, quá thời gian đơn hàng sẽ tự hủy và hoàn tiền</p> */}
                  <div className='d-flex mb-2'>
                    <h4 className='me-2'>Tên sản phẩm:</h4>
                    <h4 className='heading-detail-service'>{data?.detail?.id_detailBooth?.name}</h4>
                  </div>
                  {data?.finishDay && (
                    <div className='d-flex mb-2'>
                      <h5 className='me-2'>
                        Khách hàng yêu cầu bạn hoàn thành đơn hàng trong vòng {data?.finishDay} ngày
                      </h5>
                      {/* <h4 className='heading-detail-service'>{data?.detail?.id_detailBooth?.name}</h4> */}
                    </div>
                  )}
                  <div className='d-flex mb-4 align-items-center'>
                    <h5 className='mb-0 me-2'>Chi tiết yêu cầu:</h5>
                    <p>{data?.detail?.requestContent}</p>
                  </div>
                  <div className='d-flex py-2 justify-content-between wrap-detail-service'>
                    <p>Số lượng: {data?.detail?.quantity}</p>
                    <p>Giá: {data?.detail?.id_detailBooth?.price.toLocaleString()}</p>
                  </div>
                  <div className='d-flex py-2 justify-content-between wrap-detail-service'>
                    <p>Tên gian hàng</p>
                    <p>{data?.detail?.id_boothProduct?.nameBooth || data?.detail?.id_detailBooth?.name}</p>
                  </div>
                  <div className='d-flex py-2 justify-content-between wrap-detail-service'>
                    <p>Ngày đặt</p>
                    <p>13/05/2024 11:27</p>
                  </div>
                  <div className='d-flex py-2 justify-content-between wrap-detail-service'>
                    <p>Giảm</p>
                    <p>0</p>
                  </div>
                  <div className='d-flex py-2 justify-content-between wrap-detail-service'>
                    <p>Reseller</p>
                    <p>0</p>
                  </div>
                  <div className='d-flex py-2 justify-content-between wrap-detail-service'>
                    <p>Hoàn tiền</p>
                    <p>0</p>
                  </div>
                  <div className='d-flex py-2 justify-content-between wrap-detail-service'>
                    <h4>Tổng thanh toán</h4>
                    <h4>{data?.total ? data?.total.toLocaleString() : 0} VND</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  )
}

export default CancelService
