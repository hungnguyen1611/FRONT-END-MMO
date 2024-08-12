// import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react'
// import { auth, db } from "./firebase";
// import { setDoc, doc } from "firebase/firestore";
import { MailOutlined, LockOutlined, UserOutlined, QrcodeOutlined } from '@ant-design/icons'
import './Register.css'
import { Form, Input, Typography, Button } from 'antd'
import { notification } from 'antd'
import { doCreateUserWithEmailAndPassword } from '~/firebase/auth'
import { useAuth } from '~/contexts/authContext'
import './Header.css'
import { GoogleLogin } from '@react-oauth/google'

import google from '~/assets/img/google.png'
import { auth } from '~/firebase/firebase' // Đường dẫn đến file cấu hình Firebase của bạn
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'

import axios from 'axios'

const { Title, Text, Link } = Typography

function Register({ switchToLogin }) {
  const [user, setUser] = useState({ username: '', gmail: '', password: '', affiliate: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    console.log(user)
    if (user.password.length < 8) {
      setError('Mật khẩu phải dài hơn 8 ký tự.')
      return
    }
    if (user.password !== user.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.')
      return
    }
    setError('')
    // Tạo người dùng với Firebase
    // const userCredential = await createUserWithEmailAndPassword(auth, user.gmail, user.password)
    // const user1 = userCredential.user
    // // Gửi email xác nhận
    // const res = await sendEmailVerification(user1)
    // console.log('res', res)
    // await createUserWithEmailAndPassword(auth, user.gmail, user.password).then(async (userCred) => {
    //   const user = userCred.user
    //   await sendEmailVerification(user)
    // })
    console.log(user)
    try {
      const res = await axios.post(
        // eslint-disable-next-line no-undef
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_REGISTER}`,
        user
      )
      console.log('res', res)
      setMsg(res?.data?.message)
      notification.success({
        message: 'Đăng ký thành công',
        duration: 2
      })
    } catch (error) {
      const errorMessage = error?.response?.data?.message || 'Đã xảy ra lỗi không xác định.'
      notification.error({
        message: 'Đăng ký thất bại.',
        description: errorMessage,
        duration: 2
      })
      // notification.error({
      //   message: 'Đăng ký thất bại.',
      //   duration: 2
      // })
      console.log(error)
      setError(error?.data)
    }
    // await doCreateUserWithEmailAndPassword(gmail, password)
  }

  return (
    <div className='register-container'>
      <form onSubmit={onSubmit} className='form' id='form-1'>
        <Title level={3} className='login-title'>
          Đăng Ký
        </Title>
        <Text className='login-subtitle'>Chào mừng bạn đến với MMOWEB3</Text>
        {/* <div className='spacer'></div> */}
        <div className='form-group'>
          <label className='label-input-register' htmlFor='username'>
            Tài khoản
          </label>
          <Input
            prefix={<UserOutlined style={{ color: '#00B14F' }} />}
            id='username'
            type='username'
            placeholder='Nhập tên tài khoản'
            className='input-register'
            name='username'
            value={user.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label className='label-input-register' htmlFor='gmail'>
            Email
          </label>
          <Input
            prefix={<MailOutlined style={{ color: '#00B14F' }} />}
            id='gmail'
            type='email'
            placeholder='Nhập email'
            className='input-register'
            value={user.gmail}
            name='gmail'
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label className='label-input-register' htmlFor='password'>
            Mật khẩu
          </label>
          <Input
            prefix={<LockOutlined style={{ color: '#00B14F' }} />}
            id='password'
            type='password'
            placeholder=' Nhập mật khẩu'
            className='input-register'
            name='password'
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label className='label-input-register' htmlFor='password_confirmation'>
            Nhập lại mật khẩu
          </label>
          <Input
            prefix={<LockOutlined style={{ color: '#00B14F' }} />}
            id='password_confirmation'
            type='password'
            placeholder='Nhập lại mật khẩu'
            className='input-register'
            name='confirmPassword'
            value={user.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label className='label-input-register' htmlFor='referral-affiliate'>
            Mã giới thiệu
          </label>
          <Input
            prefix={<QrcodeOutlined style={{ color: '#00B14F' }} />}
            id='referral-affiliate'
            type='text'
            placeholder='Nhập mã giới thiệu'
            className='input-register'
            name='affiliate'
            value={user.affiliate}
            onChange={handleChange}
          />
        </div>
        {error !== '' ? (
          <span className='form-message' style={{ color: 'red' }}>
            {error}
          </span>
        ) : (
          <></>
        )}
        {msg && (
          <span className='form-message' style={{ color: 'red' }}>
            {msg}
          </span>
        )}
        {/* <button className='form-submit'>Đăng ký</button> */}
        <Button htmlType='submit' className='register-button'>
          Đăng ký
        </Button>
        <div className='register-divider'>
          <Text>hoặc</Text>
        </div>
        <div className='google-register-button'>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              try {
                const decoded = jwtDecode(credentialResponse?.credential)
                console.log('Decoded:', decoded)
                if (decoded) {
                  setGoogleLog({ ...googleLog, gmail: decoded.email, username: decoded.name })
                  handleGoogle(decoded.email, decoded.name)
                }
              } catch (e) {
                console.error('JWT Decode Error:', e)
              }
            }}
            onError={(error) => console.log(error)}
          />
        </div>
        {/* <p className='register-link' onClick={switchToLogin}>
        Bạn đã có tài khoản!
      </p> */}

        <div className='signup-link'>
          <Text className='custom-text'>
            Bạn đã có tài khoản?{' '}
            <Link className='custom-link' href='#' onClick={switchToLogin}>
              Đăng nhập ngay
            </Link>
          </Text>
        </div>
      </form>
    </div>
  )
}
export default Register
