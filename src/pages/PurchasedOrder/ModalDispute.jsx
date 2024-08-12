import { notification } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'

const ModalDispute = ({ id_business, id_order, codeOrder, onCancel }) => {
  console.log('codeOrder', codeOrder)
  console.log(id_business, id_order)
  // const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const accessToken = localStorage.getItem('token')

  const handleSubmit = async (e) => {
    e.preventDefault()
    // let api = null
    // if (id_business === import.meta.env.VITE_API_URL_API_ID_PRODUCT) {
    //   api = import.meta.env.VITE_API_URL_API_ORDER_PRODUCT_UPDATE_APPROVED
    // } else {
    //   api = import.meta.env.VITE_API_URL_API_ORDER_SERVICE_UPDATE_APPROVED
    // }
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_UPDATE_ORDER_STATUS}`,
        {
          id_business,
          id_order,
          contentComplain: body
        },
        {
          headers: {
            'Content-Type': 'application/json',
            token: `Bearer ${accessToken}`
          }
        }
      )
      console.log('res', res)
      notification.success({
        message: 'Khiểu nại đơn hàng thành công.',
        duration: 2
      })
      setTimeout(() => {
        onCancel() // Gọi hàm onCancel() sau 2 giây
      }, 2000)
    } catch (error) {
      notification.error({
        message: 'Khiếu nại đơn hàng thất bại.',
        duration: 2
      })
      console.log(error)
    }
  }
  return (
    <div>
      <h3>Khiếu nại đơn hàng</h3>
      <p style={{ color: 'var(--primary-color)' }}>
        Trường hợp bạn muốn hoàn tiền của đơn hàng, chúng tôi sẽ giữ số tiền của đơn hàng đó cho bạn và chủ shop có thể
        thương lượng hoặc tranh chấp
      </p>
      <h5 className='my-3'>Đơn hàng: {codeOrder}</h5>
      {/* <div className='form-group mt-3'>
        <label className='form-label' htmlFor='email'>
          Thông tin liên hệ
        </label>
        <input
          id='title'
          type='text'
          className='form-control'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div> */}
      <div className='form-group mt-3'>
        <label className='form-label' htmlFor='email'>
          Nội dung khiếu nại
        </label>
        <textarea
          style={{ minHeight: '200px' }}
          id='body'
          type='text'
          // placeholder='VD: Tôi ...'
          className='form-control'
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </div>
      <button onClick={handleSubmit} type='button' className='btn btn-primary btn-primary-bg my-3'>
        Gửi khiếu nại
      </button>
    </div>
  )
}

export default ModalDispute
