import { Modal, notification } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Reseller = ({ id_user, id_seller, id_booth, id_business, setIsModalOpen }) => {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [number, setNumber] = useState(null)
  const accessToken = localStorage.getItem('token')

  const handleCancel = () => {
    setOpen(false)
  }
  const handleOpen = async () => {
    console.log('123')
    setOpen(true)
  }
  const handleSubmit = async () => {
    const body = {
      id_user_reseller: id_user,
      percent: number,
      message: title,
      id_booth,
      id_user_agent: id_seller,
      id_business
    }

    if (!id_user) {
      notification.error({
        message: 'Bạn phải đăng nhập tài khoản.',
        duration: 2
      })
      setOpen(false)
      setIsModalOpen(true)
      return
    }
    if (title === '') {
      notification.error({
        message: 'Bạn phải nhập lời chào hợp tác.',
        duration: 2
      })
      return
    } else if (number === null) {
      notification.error({
        message: 'Bạn phải nhập chiếc khấu mong muốn.',
        duration: 2
      })
      return
    } else {
      console.log(body)
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_NEW_RESELLER}`,
          body,
          {
            headers: {
              'Content-Type': 'application/json',
              token: `Bearer ${accessToken}`
            }
          }
        )
        notification.success({
          message: 'Đăng ký reseller thành công.',
          duration: 2
        })
        setTimeout(() => {
          handleCancel()
        }, 2000)
        console.log('res', res)
      } catch (error) {
        console.log(error)
        const errorMessage = error?.response?.data?.message || 'Đã xảy ra lỗi không xác định.'
        notification.error({
          message: 'Đăng ký reseller thất bại.',
          description: errorMessage,
          duration: 2
        })
      }
    }
  }
  return (
    <>
      <button
        onClick={handleOpen}
        type='button'
        className='btn btn-primary bg-orange my-2 px-4 py-2 '
        style={{ width: '167px' }}
      >
        Resseller
      </button>
      <Modal className='width-modal modal-reseller' open={open} onCancel={handleCancel} footer={null}>
        <div>
          <h3 className='title-reseller'>Reseller!</h3>
          <p className='fs-6' style={{ color: 'green' }}>
            Trở thành reseller của gian hàng này, bạn sẽ được hưởng % doanh thu từ chiết khấu trên mỗi đơn hàng bạn bán
            được.
          </p>
          <p className='fs-6 mb-3' style={{ color: 'green' }}>
            Lưu ý: Khách chỉ cần vào 1 lần bằng link ref, thì sẽ áp dụng với mọi đơn hàng về sau.
          </p>
          <div className='form-group'>
            <label className='form-label' htmlFor='title'>
              Chiết khấu mong muốn(%)
            </label>
            <input
              id='number'
              type='number'
              // placeholder='VD: '
              className='input-reseller'
              value={number}
              name='number'
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label className='form-label' htmlFor='title'>
              Lời chào hợp tác
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
          {/* <div className='text-center'>
            <button onClick={handleSubmit} type='button' className='btn btn-primary btn-primary-bg my-3'>
              Đồng ý
            </button>
            <button onClick={() => handleCancel()} type='button' className='btn btn-primary btn-primary-blue my-3 ms-3'>
              Hủy bỏ
            </button>
          </div> */}

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

export default Reseller
