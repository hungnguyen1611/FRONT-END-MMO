import { notification } from 'antd'
import axios from 'axios'
import React from 'react'

const ModalReseller = ({ id, id_booth, handleClose }) => {
  const accessToken = localStorage.getItem('token')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_RESELLER_STATUS_APPROVED}${id}`,
        {
          id_booth
        },
        {
          headers: {
            token: `Bearer ${accessToken}`
          }
        }
      )
      console.log('res', res)
      notification.success({
        message: 'Bạn đã chấp nhận thành công.',
        duration: 2
      })
      setTimeout(() => {
        handleClose()
      }, 2000)
    } catch (error) {
      notification.error({
        message: 'Bạn đã chấp nhận thất bại.',
        duration: 2
      })
      console.log(error)
    }
  }
  const handleCancel = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_RESELLER_STATUS_CANCEL}${id}`,
        {
          headers: {
            token: `Bearer ${accessToken}`
          }
        }
      )
      console.log('res', res)
      notification.success({
        message: 'Bạn đã từ chối thành công.',
        duration: 2
      })
      setTimeout(() => {
        handleClose()
      }, 2000)
    } catch (error) {
      notification.error({
        message: 'Bạn đã từ chối thất bại.',
        duration: 2
      })
      console.log(error)
    }
  }
  console.log(id, id_booth)
  return (
    <div>
      <h2 className='text-center'>Bạn có muốn chấp nhận cho người này resell gian hàng của bạn không</h2>
      <div>
        {' '}
        <div className='text-center'>
          <button onClick={handleCancel} type='button' className='btn btn-primary btn-primary-blue my-3'>
            Từ chối
          </button>
          <button onClick={handleSubmit} type='button' className='btn btn-primary search-order my-3 ms-3'>
            Đồng ý
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalReseller
