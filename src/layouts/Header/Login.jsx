import { useState } from 'react'
import { Button, notification } from 'antd'
import google from '~/assets/img/google.png'
import { useDispatch } from 'react-redux'
import { login, setError } from '~/constants/sliceRedux/auth.slice'
import axios from 'axios'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import './Login.css'
import { Form, Input, Typography } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import OneSignal from 'react-onesignal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const { Title, Text, Link } = Typography

const Login = ({ switchToRegister, handleCancel }) => {
  const onFinish = (values) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const [user, setUser] = useState({ gmail: '', password: '' })
  const [googleLog, setGoogleLog] = useState({ gmail: '', username: '' })
  const [passwordVisible, setPasswordVisible] = useState(false)
  const dispatch = useDispatch()
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_LOGIN}`,
        user
      )
      if (response.data.user) {
        dispatch(login(response.data.user))
        await OneSignal.login(response?.data?.user?._id)
        await OneSignal.User.addTag('role', response?.data?.user?.role)

        notification.success({
          message: 'Đăng nhập thành công.',
          duration: 2
        })
        setTimeout(() => {
          handleCancel()
        }, 2000)
      } else {
        throw new Error('Đăng nhập thất bại.')
      }
    } catch (error) {
      dispatch(setError(error.response.data.message || 'Đăng nhập thất bại.'))
      notification.error({
        message: 'Đăng nhập thất bại.',
        description: error.response.data.message || 'Đăng nhập thất bại.',
        duration: 2
      })
    }
  }

  const handleGoogle = async (gmail, username) => {
    const googleData = { gmail, username }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_LOGIN_GG}`,
        googleData
      )
      const user = response?.data?.user

      if (user) {
        if (user.findGmail) {
          dispatch(
            login({
              accessToken: user.accessToken,
              refreshToken: user.refreshToken,
              gmail: user.findGmail.gmail,
              role: user.findGmail.role,
              _id: user.findGmail._id
            })
          )
        } else if (user.saveUser) {
          dispatch(
            login({
              accessToken: user.accessToken,
              refreshToken: user.refreshToken,
              gmail: user.saveUser.gmail,
              role: user.saveUser.role,
              _id: user.saveUser._id
            })
          )
        } else {
          throw new Error('Đăng nhập thất bại.')
        }

        notification.success({
          message: 'Đăng nhập thành công.',
          duration: 2
        })

        // Lưu trữ refresh token vào local storage
        localStorage.setItem('refreshToken', user.refreshToken)

        setTimeout(() => {
          handleCancel()
        }, 2000)
      } else {
        throw new Error('Đăng nhập thất bại.')
      }
    } catch (error) {
      console.error('Error:', error) // Log thông tin lỗi

      const errorMessage = error.response?.data?.message || 'Đăng nhập thất bại.'
      dispatch(setError(errorMessage))
      notification.error({
        message: 'Đăng nhập thất bại.',
        description: errorMessage,
        duration: 2
      })
    }
  }

  return (
    <div className='login-container'>
      <Form onSubmitCapture={handleSubmit} className='login-form' id='form-1' layout='vertical'>
        <Title level={3} className='login-title'>
          Đăng nhập
        </Title>
        <Text className='login-subtitle'>Chào mừng bạn đã quay trở lại</Text>

        <Form.Item
          label={<span style={{ color: '#989898', fontWeight: '500' }}>Email</span>}
          name='email'
          rules={[{ message: 'Vui lòng nhập email!' }]}
          // This removes the asterisk
          labelCol={{ span: 24 }} // Adjust label column layout
          wrapperCol={{ span: 24 }} // Adjust wrapper column layout
        >
          <Input
            id='email'
            type='email'
            value={user.gmail}
            name='gmail'
            required
            prefix={<MailOutlined style={{ color: '#00B14F' }} />}
            placeholder='Nhập email'
            className='input-login'
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          name='password'
          rules={[{ message: 'Vui lòng nhập mật khẩu!' }]}
          label={<span style={{ color: '#989898', fontWeight: '500', marginBottom: '0px' }}>Mật khẩu</span>}
          className='position-relative'
        >
          <Input
            id='password'
            type={passwordVisible ? 'text' : 'password'}
            value={user.password}
            name='password'
            onChange={handleChange}
            required
            prefix={<LockOutlined style={{ color: '#00B14F' }} />}
            placeholder='Nhập mật khẩu'
            className='input-login'
          />
          <div className='position-absolute eye-login' onClick={togglePasswordVisibility}>
            <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
          </div>
        </Form.Item>

        <Form.Item>
          <Button htmlType='submit' className='login-button'>
            Đăng nhập
          </Button>
        </Form.Item>

        <Form.Item>
          <div className='login-divider'>
            <Text>hoặc</Text>
          </div>
        </Form.Item>

        <Form.Item>
          <div className='google-login-button'>
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
        </Form.Item>

        <Form.Item>
          <div className='signup-link'>
            <Text className='custom-text'>
              Bạn chưa có tài khoản?{' '}
              <Link className='custom-link' href='#' onClick={switchToRegister}>
                Đăng ký ngay
              </Link>
            </Text>
          </div>
        </Form.Item>
      </Form>
      {/* <div className='custom-btn-google d-flex justify-content-center w-100 my-3'>
          <span>
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
          </span>
        </div> */}
      {/* <Text>Bạn chưa có tài khoản!</Text>
        <p className='register-link' onClick={switchToRegister}>
          <Link href='#'>Tạo tài khoản</Link>
        </p> */}
      {/* <form onSubmit={handleSubmit} className='form' id='form-1'>
        <h3 className='heading'>Đăng nhập</h3>
        <p className='desc'>Chào mừng bạn đã quay trở lại</p>
        <div className='form-group'>
          <label className='form-label' htmlFor='email'>
            Email
          </label>
          <input
            id='email'
            type='email'
            placeholder='VD: trungtin@gmail.com'
            className='form-control'
            value={user.gmail}
            name='gmail'
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label className='form-label' htmlFor='password'>
            Mật khẩu
          </label>
          <input
            id='password'
            type='password'
            placeholder='Mật khẩu'
            className='form-control'
            value={user.password}
            name='password'
            onChange={handleChange}
            required
          />
        </div>
        <button className='form-submit'>Đăng nhập</button>
        <div className='custom-btn-google d-flex justify-content-center w-100 my-3'>
          <span>
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
          </span>
        </div>
        <p>Bạn chưa có tài khoản !</p>
        <p className='register-link' onClick={switchToRegister}>
          Tạo tài khoản
        </p>
      </form> */}
    </div>
  )
}

export default Login
