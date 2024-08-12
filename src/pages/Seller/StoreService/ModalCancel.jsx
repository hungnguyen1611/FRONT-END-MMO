import LazyImage from '~/hooks/LazyImage/LazyImage'
import success from '~/assets/img/cancel.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { notification } from 'antd'
import { useState } from 'react'

const ModalCancel = ({ cancel, id_business, id_order }) => {
  console.log(id_business, id_order)
  const navigate = useNavigate()
  const [content, setContent] = useState('')
  const accessToken = localStorage.getItem('token')

  const handleSubmit = async (e) => {
    e.preventDefault()
    let api = null
    if (id_business === import.meta.env.VITE_API_URL_API_ID_PRODUCT) {
      api = import.meta.env.VITE_API_URL_API_ORDER_PRODUCT_UPDATE_CANCEL
    } else {
      api = import.meta.env.VITE_API_URL_API_ORDER_SERVICE_UPDATE_CANCEL
    }
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${api}${id_order}`,
        {
          contentCancel: content
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            token: `Bearer ${accessToken}`
          }
        }
      )
      console.log('res', res)
      notification.success({
        message: 'Hủy đơn hàng thành công.',
        duration: 2
      })
      setTimeout(() => {
        navigate(`/store/product`)
      }, 2000)
    } catch (error) {
      notification.error({
        message: 'Hủy đơn hàng thất bại.',
        duration: 2
      })
      console.log(error)
    }
  }
  return (
    <div className='d-flex flex-column align-items-center'>
      <LazyImage className='wrap-image-detail-service mb-3' src={success} alt='face' />
      <h3>Hủy đơn hàng</h3>
      <div className='form-group w-100'>
        <label className='form-label' htmlFor='email'>
          Lí do hủy đơn hàng
        </label>
        <textarea
          style={{ minHeight: '20vh' }}
          id='content'
          type='text'
          placeholder='VD: Xin lỗi quý khách vì sự cố ...'
          className='form-control'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div className='text-start w-100'>
        <p style={{ color: 'red' }}>Lưu ý: Bạn phải nêu rõ lí do hủy đơn cho người dùng</p>
      </div>

      <div className='d-flex'>
        <button onClick={handleSubmit} type='button' className='btn btn-primary btn-primary-bg my-3'>
          Chấp nhận
        </button>
        <button onClick={() => cancel()} type='button' className='btn btn-primary btn-primary-blue my-3 ms-3'>
          Hủy
        </button>
      </div>
    </div>
  )
}

export default ModalCancel
