import HeaderSell from '~/layouts/HeaderSell/HeaderSell'
import SidebarSell from '~/layouts/SidebarSell/SidebarSell'
import success from '~/assets/img/success.png'
import LazyImage from '~/hooks/LazyImage/LazyImage'
import { Steps, Modal } from 'antd'
import { useEffect, useState } from 'react'
import ModalDetail from './ModalDetail'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import NotFound from '~/components/manager/NotFound'

const TransactionService = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [data, setData] = useState([])
  const accessToken = localStorage.getItem('token')
  const { id_business, id_order } = useParams()
  const handleCancel = () => {
    setIsModalOpen(false)
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
      {data?.status === 'Completed' || data?.status === 'Finish' ? (
        <div className=''>
          <HeaderSell />
          <div className='w-100 d-flex'>
            <SidebarSell />
            <div className='border mt-5 mt-lg-0 p-2 container'>
              <h2 className='mb-5 text-center heading-detail-service'>Chi tiết đơn hàng {data?.codeOrder}</h2>
              <div className='d-flex justify-content-center wrap-bottom-detail pb-3'>
                <Steps
                  className='w-50'
                  current={2}
                  items={[
                    {
                      title: 'Đặt hàng'
                    },
                    {
                      title: 'Xác nhận'
                    },
                    {
                      title: 'Giao hàng'
                    }
                  ]}
                />
              </div>
              <div className='row'>
                <div className='col-12 col-md-6 mt-3'>
                  <div className='d-flex flex-column align-items-center'>
                    <LazyImage className='wrap-image-detail-service mb-3' src={success} alt='face' />
                    {data?.status === 'Completed' && data?.statusRefund === false ? (
                      <>
                        <h4>Tạm giữ tiền</h4>
                        <p className='mb-3'>Giao hàng thành công tạm giữ tiền 3 ngày</p>
                      </>
                    ) : (
                      <>
                        <h4>Đơn hàng đã hoàn tất</h4>
                        <p className='mb-3'>Tiền đã được chuyển về tài khoản của bạn!</p>
                      </>
                    )}

                    {/* <div className='d-flex'>
                      <button
                        onClick={() => setIsModalOpen(true)}
                        type='button'
                        className='btn btn-primary btn-primary-bg my-3'
                      >
                        Tải về
                      </button>
                    </div> */}
                    <div className='text-start w-100'>
                      <h5 style={{ color: 'green' }}>Nội dung bạn gởi:</h5>
                      <pre style={{ color: 'green', whiteSpace: 'pre-wrap' }}>{data?.contentDelivery}</pre>
                    </div>
                  </div>
                  <Modal
                    open={isModalOpen}
                    // onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}
                  >
                    <ModalDetail cancel={handleCancel} />
                  </Modal>
                </div>
                <div className='col-12 col-md-6 mt-3'>
                  <div className='d-flex mb-2'>
                    <h4 className='me-2'>Tên sản phẩm:</h4>
                    <h4 className='heading-detail-service'>{data?.detail?.id_detailBooth?.name}</h4>
                  </div>
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
                    <p>{data?.detail?.id_boothProduct?.nameBooth}</p>
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

export default TransactionService
