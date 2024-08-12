import success from '~/assets/img/success.png'
import LazyImage from '~/hooks/LazyImage/LazyImage'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { notification } from 'antd'
const ModalConfirm = ({ cancel, id_business, id_order }) => {
  const navigate = useNavigate()
  const [contentDelivery, setContentDelivery] = useState('')
  const accessToken = localStorage.getItem('token')

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(accessToken)
    let api = null
    if (id_business === import.meta.env.VITE_API_URL_API_ID_PRODUCT) {
      api = import.meta.env.VITE_API_URL_API_ORDER_PRODUCT_UPDATE_COMPLETED
    } else {
      api = import.meta.env.VITE_API_URL_API_ORDER_SERVICE_UPDATE_COMPLETED
    }
    if (contentDelivery === '') {
      notification.error({
        message: 'Vui lòng nhập nội dung.',
        duration: 2
      })
      return
    } else {
      try {
        const res = await axios.put(
          `${import.meta.env.VITE_API_URL_BACKEND_URL}${api}${id_order}`,
          {
            contentDelivery: contentDelivery
          },
          {
            headers: {
              // 'Content-Type': 'multipart/form-data',
              token: `Bearer ${accessToken}`
            }
          }
        )
        console.log('res', res)
        notification.success({
          message: 'Chuyển đơn hàng thành công.',
          duration: 2
        })
        setTimeout(() => {
          navigate(`/store/${id_business}/transaction/${id_order}`)
        }, 2000)
      } catch (error) {
        notification.error({
          message: 'Chuyển đơn hàng thất bại.',
          duration: 2
        })
        console.log(error)
      }
    }
  }
  return (
    <div className='d-flex flex-column align-items-center'>
      <LazyImage className='wrap-image-detail-service mb-3' src={success} alt='face' />
      <h3>Thực hiện đơn hàng</h3>
      <div className='form-group w-100'>
        <label className='form-label' htmlFor='email'>
          Nội dung
        </label>
        <textarea
          style={{ minHeight: '20vh' }}
          id='contentDelivery'
          type='text'
          placeholder='VD: Tài khoản ...'
          className='form-control'
          value={contentDelivery}
          onChange={(e) => setContentDelivery(e.target.value)}
          required
        />
      </div>
      <div className='text-start w-100'>
        <p style={{ color: 'red' }}>Lưu ý: Bạn phải ghi rõ nội dung về sản phẩm của bạn.</p>
        <p style={{ color: 'red' }}>
          VD: Ghi rõ tên tài khoản hoặc mật khẩu gmail, hoặc thời gian bạn đã thực hiện dịch vụ cho họ (chụp bằng chứng
          và gởi qua tin nhắn của họ nếu có).
        </p>
      </div>
      <div className='d-flex'>
        <button onClick={handleSubmit} type='button' className='btn btn-primary search-order my-3'>
          Thực hiện
        </button>
        <button onClick={() => cancel()} type='button' className='btn btn-primary btn-primary-blue my-3 ms-3'>
          Hủy
        </button>
      </div>
    </div>
  )
}

export default ModalConfirm
