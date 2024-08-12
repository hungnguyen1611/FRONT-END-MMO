import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import LazyImage from '~/hooks/LazyImage/LazyImage'
import success from '~/assets/img/success.png'
import cancel from '~/assets/img/cancel.png'
import { Flex, Rate, notification } from 'antd'

const desc = ['Kinh khủng', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời']

const DetailOrder = ({ id_business, id_order }) => {
  const id = useSelector((state) => state.auth._id)
  // const [api, setApi] = useState(import.meta.env.VITE_API_URL_API_ORDER_PRODUCT)
  const [data, setData] = useState([])
  const [title, setTitle] = useState('')
  const [value, setValue] = useState(0)
  // const user = JSON.parse(localStorage.getItem('user') || '{}')
  const accessToken = localStorage.getItem('token')

  // const accessToken = user.token

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
          'Content-Type': 'application/json',
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
  }, [id_order, id_business])
  console.log(data)
  const handleSubmit = async () => {
    const body = {
      id_business,
      id_booth: data?.detail?.id_boothProduct?._id,
      id_user: id,
      review: title,
      stars: value
    }

    if (title === '') {
      notification.error({
        message: 'Bạn phải nhập nội dung đánh giá.',
        duration: 2
      })
      return
    } else {
      console.log(body)
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_SAVE_REVIEWS}`,
          body,
          {
            headers: {
              'Content-Type': 'application/json',
              token: `Bearer ${accessToken}`
            }
          }
        )
        notification.success({
          message: 'Đánh giá thành công.',
          duration: 2
        })
        console.log('res', res)
      } catch (error) {
        console.log(error)
        notification.error({
          message: 'Đánh giá thất bại.',
          duration: 2
        })
      }
    }
  }
  console.log('dataOrder', data)
  return (
    <div>
      <div className='my-5'>
        <div className='wrapper-purchased'>
          <div className='text-center mb-5'>
            <h2 className='mb-5 text-center heading-detail-service'>Chi tiết đơn hàng {data?.codeOrder}</h2>
          </div>
          <div className='border mt-5 p-2'>
            <div className='row'>
              {data?.status === 'Pending' ? (
                <div className='col-12 col-md-6 mt-3'>
                  <div className='d-flex flex-column align-items-center'>
                    <LazyImage className='wrap-image-detail-service mb-3' src={success} alt='face' />
                    <h4>Chờ xác nhận</h4>
                    <p>Đơn hàng đang đợi chủ shop xác nhận</p>
                  </div>
                </div>
              ) : data?.status === 'Cancel' ? (
                <div className='col-12 col-md-6 mt-3'>
                  <div className='d-flex flex-column align-items-center mb-3'>
                    <LazyImage className='wrap-image-detail-service mb-3' src={cancel} alt='face' />
                    <h4>Đơn hàng bị hủy</h4>
                    <p>Đơn hàng của bạn đã bị hủy</p>
                  </div>
                  {/* <div className='text-center'>
                    <h5 style={{ color: 'red' }}>Lí do bị hủy: {data?.contentCancel}</h5>
                  </div> */}
                  <div className='text-start w-100'>
                    <h5 style={{ color: 'red' }}>Lí do bị hủy:</h5>
                    <pre className='fs-6' style={{ color: 'red', whiteSpace: 'pre-wrap' }}>
                      {data?.contentCancel}
                    </pre>
                  </div>
                </div>
              ) : data?.status === 'Approved' ? (
                <div className='col-12 col-md-6 mt-3'>
                  <div className='d-flex flex-column align-items-center'>
                    <LazyImage className='wrap-image-detail-service mb-3' src={success} alt='face' />
                    <h4>Chờ giao hàng</h4>
                    <p>Đơn hàng đã được chủ shop xác nhận, đợi chủ shop giao hàng</p>
                  </div>
                </div>
              ) : data?.status === 'complain' ? (
                <div className='col-12 col-md-6 mt-3'>
                  <div className='d-flex flex-column align-items-center'>
                    <LazyImage className='wrap-image-detail-service mb-3' src={success} alt='face' />
                    <h4>Đơn hàng khiếu nại</h4>
                    <p>Đơn hàng này đã được bạn khiếu nại đợi chủ shop phản hồi</p>
                  </div>
                </div>
              ) : data?.status === 'Dispute' ? (
                <div className='col-12 col-md-6 mt-3'>
                  <div className='d-flex flex-column align-items-center'>
                    <LazyImage className='wrap-image-detail-service mb-3' src={success} alt='face' />
                    <h4>Đơn hàng tranh chấp</h4>
                    <p>Đơn hàng này đã bị tranh chấp từ chủ shop. Admin sẽ liên hệ với bạn để giải quyết</p>
                  </div>
                </div>
              ) : data?.status === 'Completed' || data?.status === 'Finish' ? (
                <div className='col-12 col-md-6 mt-3'>
                  <div className='d-flex flex-column align-items-center'>
                    <LazyImage className='wrap-image-detail-service mb-3' src={success} alt='face' />
                    <h4>Đã giao hàng</h4>
                    <p>Đơn hàng đã được giao thành công</p>
                  </div>
                  <div className='text-start w-100 mt-3'>
                    <h4 style={{ color: 'green' }}>Nội dung đơn hàng:</h4>
                    <pre className='fs-6' style={{ color: 'green', whiteSpace: 'pre-wrap' }}>
                      {data?.contentDelivery}
                    </pre>
                  </div>
                  <Flex gap='middle' vertical>
                    <Rate tooltips={desc} onChange={setValue} value={value} />
                    {/* {value ? <span>{desc[value - 1]}</span> : null} */}
                  </Flex>
                  <div className='form-group'>
                    <label className='form-label' htmlFor='title'>
                      Review sản phẩm (không bắt buộc)
                    </label>
                    <textarea
                      style={{ minHeight: '200px' }}
                      id='title'
                      type='title'
                      // placeholder='VD: '
                      className='form-control'
                      value={title}
                      name='title'
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <button onClick={handleSubmit} type='button' className='btn btn-primary btn-primary-bg my-3'>
                    Đồng ý
                  </button>
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
                  <p>{data?.detail?.id_boothProduct?.nameBooth || data?.detail?.id_boothService?.nameBooth}</p>
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

export default DetailOrder
