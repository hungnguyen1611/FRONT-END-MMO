import { notification } from 'antd'
import axios from 'axios'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Footer from '~/layouts/Footer/Footer'
import Header from '~/layouts/Header/Header'

const ChangePass = () => {
  const id_user = useSelector((state) => state.auth._id)
  console.log(id_user)
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const accessToken = localStorage.getItem('token')
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== passwordConfirm) {
      notification.error({
        message: 'Mật khẩu mới và xác nhận mật khẩu không khớp.',
        duration: 2
      })
      return
    }
    if (password.length < 6) {
      notification.error({
        message: 'Mật khẩu ít nhất là 8 ký tự.',
        duration: 2
      })
      return
    }
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_CHANGE_PASSWORD}${id_user}`,
        {
          password: password
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
        message: 'Đổi mật khẩu thành công thành công.',
        duration: 2
      })
    } catch (error) {
      notification.error({
        message: 'Đổi mật khẩu thất bại.',
        duration: 2
      })
      console.log(error)
    }
  }
  return (
    <div>
      <Header />
      <div style={{ height: '60vh' }} className='container my-5'>
        <div className='wrap-support p-3'>
          <div className=''>
            <h3 className='mb-3'>Đổi mật khẩu</h3>
            {/* <div className='form-group'>
              <label className='form-label' htmlFor='password'>
                Mật khẩu cũ
              </label>
              <input
                id='password'
                type='text'
                placeholder='Mật khẩu'
                className='form-control'
                //   value={password}
                //   onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div> */}
            <div className='form-group'>
              <label className='form-label' htmlFor='password'>
                Mật khẩu mới
              </label>
              <input
                id='password'
                type='password'
                placeholder='Mật khẩu'
                className='form-control'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className='form-group'>
              <label className='form-label' htmlFor='password_confirmation'>
                Nhập lại mật khẩu mới
              </label>
              <input
                id='password_confirmation'
                type='password'
                placeholder='Nhập lại mật khẩu'
                className='form-control'
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
              />
            </div>
            <button onClick={handleSubmit} type='button' className='btn btn-primary search-order mb-3'>
              Gửi
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ChangePass
