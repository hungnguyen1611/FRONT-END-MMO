import axios from 'axios'
import { useEffect, useState } from 'react'
import LazyImage from '~/hooks/LazyImage/LazyImage'
import success from '~/assets/img/success.png'

const DetailComplain = ({ id_business, id_order }) => {
  const [data, setData] = useState([])
  const accessToken = localStorage.getItem('token')

  console.log(id_business, id_order)
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
  console.log(data)

  return (
    <div>
      <div className='my-5'>
        <div className='wrapper-purchased'>
          <div className='text-center mb-5'>
            <h2 className='mb-5 text-center heading-detail-service'>Chi tiết đơn hàng {data?.codeOrder}</h2>
          </div>
          <div className='border mt-5 p-2'>
            <div className='row'>
              {data?.status === 'complain' ? (
                <div className='col-12 col-md-6 mt-3'>
                  <div className='d-flex flex-column align-items-center'>
                    <LazyImage className='wrap-image-detail-service mb-3' src={success} alt='face' />
                    <h4>Đơn hàng khiếu nại</h4>
                    <p>
                      Đơn hàng này đã được người mua khiếu nại, vui lòng giải quyết bằng cách bấm vào nút giải quyết
                    </p>
                  </div>
                </div>
              ) : data?.status === 'Dispute' ? (
                <div className='col-12 col-md-6 mt-3'>
                  <div className='d-flex flex-column align-items-center'>
                    <LazyImage className='wrap-image-detail-service mb-3' src={success} alt='face' />
                    <h4>Đơn hàng tranh chấp</h4>
                    <p>Đơn hàng này đã được bạn tranh chấp. Admin sẽ liên hệ với bạn để giải quyết</p>
                  </div>
                </div>
              ) : null}

              <div className='col-12 col-md-6 mt-3'>
                <div className='d-flex'>
                  <h4>Tên sản phẩm:</h4>
                  <h4 className='heading-detail-service ms-2'>{data?.detail?.id_detailBooth?.name}</h4>
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
    </div>
  )
}

export default DetailComplain
