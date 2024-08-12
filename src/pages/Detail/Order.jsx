import React, { useState } from 'react'
import { Modal, notification } from 'antd'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Order = ({
  id_user,
  codeCoupon,
  id_business,
  id_booth,
  id_detailBooth,
  quantity,
  total,
  id_seller,
  linkReseller,
  day,
  quantityService,
  setIsModalOpen
}) => {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const accessToken = localStorage.getItem('token')
  const navigate = useNavigate()
  const handleCancel = () => {
    setOpen(false)
  }
  const handleOpen = async () => {
    if (!id_user) {
      notification.error({
        message: 'Bạn phải đăng nhập tài khoản.',
        duration: 2
      })
      setOpen(false)
      setIsModalOpen(true)
      return
    }

    setOpen(true)
  }

  const handleSubmit = async () => {
    const body = {
      id_user,
      codeCoupon,
      id_business,
      id_booth,
      id_detailBooth,
      total,
      id_seller,
      requestContent: title
    }

    if (id_business === import.meta.env.VITE_API_URL_API_ID_PRODUCT) {
      body.quantity = quantity
      body.finishDay = ''
    }
    if (id_business === import.meta.env.VITE_API_URL_API_ID_SERVICE) {
      body.finishDay = day
      body.quantity = quantityService
    }
    if (Array.isArray(linkReseller)) {
      body.linkReseller = ''
    } else {
      body.linkReseller = linkReseller
    }
    if (title === '') {
      notification.error({
        message: 'Nếu không có yêu cầu xin vui lòng nhập" không yêu cầu "',
        duration: 2
      })
      return
    } else {
      console.log(body)
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_CREATE_ORDER}`,
          body,
          {
            headers: {
              'Content-Type': 'application/json',
              token: `Bearer ${accessToken}`
            }
          }
        )
        notification.success({
          message: 'Mua hàng thành công.',
          duration: 2
        })
        setTimeout(() => {
          navigate('/purchased')
        }, 2000)
        console.log('res', res)
      } catch (error) {
        console.log(error)
        const errorMessage = error?.response?.data?.message || 'Đã xảy ra lỗi không xác định.'
        notification.error({
          message: 'Mua hàng thất bại.',
          description: errorMessage,
          duration: 2
        })
      }
    }
  }
  return (
    <>
      <button onClick={handleOpen} type='button' className='btn btn-buy-detail my-2 me-3 px-4 py-2'>
        Mua ngay
      </button>
      <Modal className='modal-order width-modal' open={open} onCancel={handleCancel} footer={null}>
        <div>
          <h3 className='title-order mb-4'>Bạn có chắc chắn mua đơn hàng này không!</h3>
          <div className='form-group'>
            <label className='form-label title-lable-order' htmlFor='title'>
              Nhập yêu cầu
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

          <p className='text-center' style={{ fontSize: '24px' }}>
            {' '}
            Nếu không có yêu cầu xin vui lòng nhập ' KHÔNG YÊU CẦU '
          </p>
          <div className='text-center footer-button-order'>
            <button onClick={handleSubmit} type='button' className='my-3 btn-accept'>
              Đồng ý
            </button>
            <p onClick={() => handleCancel()} type='button' className='my-1 btn-cancle'>
              Hủy
            </p>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Order
