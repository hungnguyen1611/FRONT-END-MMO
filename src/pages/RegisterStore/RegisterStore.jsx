import { faClock, faEnvelope, faFaceGrinSquintTears } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { notification, Select, Typography } from 'antd'
import axios from 'axios'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '~/constants/sliceRedux/auth.slice'
import Footer from '~/layouts/Footer/Footer'
import Header from '~/layouts/Header/Header'
import FooterHome from '../Home/FooterHome'
import './RegisterStore.css'
import { useTranslation } from 'react-i18next'

const RegisterStore = () => {
  const id = useSelector((state) => state.auth._id)
  const [data, setData] = useState({ numberphone: '', facebook: '' })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const accessToken = localStorage.getItem('token')
  const [errors, setErrors] = useState({})
  const { i18n } = useTranslation()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    productType: '',
    content: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSelectChange = (value) => {
    setFormData({
      ...formData,
      productType: value
    })
  }
  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName) newErrors.fullName = 'Thông tin này không thể bỏ trống'
    if (!formData.email) newErrors.email = 'Thông tin này không thể bỏ trống'
    if (!formData.phone) newErrors.phone = 'Thông tin này không thể bỏ trống'
    if (!formData.productType) newErrors.productType = 'Thông tin này không thể bỏ trống'
    if (!formData.content) newErrors.content = 'Thông tin này không thể bỏ trống'

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      console.log('value', data)
      try {
        const respone = await axios.post(
          `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_SAVE_AGENT}`,
          {
            facebook: data.facebook,
            sdt: data.numberphone,
            id_user: id
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              token: `Bearer ${accessToken}`
            }
          }
        )
        console.log(respone)
        if (respone) {
          dispatch(
            login({
              accessToken: localStorage.getItem('token'),
              role: respone.data.data.updateRole.role,
              _id: localStorage.getItem('_id')
            })
          )
          notification.success({
            message: 'Đăng ký thành công.',
            duration: 2
          })
          navigate('/store/management')
          // setTimeout(() => {
          // }, 2000)
        }
      } catch (error) {
        console.log(error)
        notification.error({
          message: 'Đăng ký thất bại, vui lòng kiểm tra lại kết nối.',
          duration: 2
        })
      }
    }
  }
  // const handleChange = (e) => {
  //   const { name, value } = e.target
  //   setData({ ...data, [name]: value })
  // }

  return (
    <div style={{ backgroundColor: '#f5f5f5' }}>
      <Header />

      <div className='contact-page'>
        <div className='container py-2'>
          <div className='row wrap-support py-5 px-4'>
            {/* <div className='d-flex flex-column col-12 col-md-6'>
            <h3 className='mb-3'>Cơ hội hợp tác</h3>
            <ul>
              <li className='fw-bold'>
                Thông tin này hoàn toàn được bảo mật, được dùng để bên mình liên lạc với bên bạn trong những lúc cần
                thiết (xác thực người bán, khi có tranh chấp xảy ra...).
              </li>
              <li className='fw-bold'>Cùng nhau kết nối, hợp tác, cùng phát triển cộng đồng kiếm tiền online.</li>
              <li className='fw-bold'>Tối ưu hóa</li>
              <p>Đội ngũ hỗ trợ sẽ liên lạc để giúp bạn tối ưu khả năng bán hàng.</p>
              <li className='fw-bold'>Đẩy tin nhắn</li>
              <p>
                Hãy vào phần thông tin tài khoản (profile), cập nhật thêm phần đẩy tin nhắn của khách về Telegram để
                không bỏ lỡ khách nào nhé.
              </p>
              <li className='fw-bold'>Bật bảo mật 2 lớp (2FA)</li>
              <p>Đây là quy định bắt buộc trước khi đăng ký bán hàng, vui lòng cập nhật thêm trong profile.</p>
            </ul>
          </div> */}

            <div className='title-registerStore d-flex flex-column align-items-center justify-content-center col-12 col-md-6'>
              <h2 className='title-contact'>
                <p style={{ lineHeight: '1.3' }}>
                  {i18n.t('register-store.Contact-us')}
                  <br /> <p style={{ color: '#28a745' }}>{i18n.t('register-store.No-time')}</p>
                </p>
              </h2>
            </div>
            <div style={{ color: '#28a745' }} className='col-12 col-md-5 mt-4 mt-md-0 infor-store py-4 px-4'>
              <div className='form-group mt-3 form-registerStore'>
                <div>
                  <input
                    id='fullName'
                    type='text'
                    placeholder='Họ và Tên *'
                    className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                    name='fullName'
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                  {errors.fullName && <span className='text-danger'>{errors.fullName}</span>}
                </div>

                <div className='contact-store'>
                  <div className='w-50'>
                    <input
                      id='email'
                      type='text'
                      placeholder={i18n.t('register-store.Enter-email')}
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    {errors.email && <span className='text-danger'>{errors.email}</span>}
                  </div>
                  <div className='w-50'>
                    <input
                      id='phone'
                      type='text'
                      placeholder='Nhập số điện thoại *'
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                      name='phone'
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                    {errors.phone && <span className='text-danger'>{errors.phone}</span>}
                  </div>
                </div>

                <div>
                  <Select
                    className={`select-store ${errors.productType ? 'is-invalid' : ''}`}
                    placeholder='Loại hình sản phẩm *'
                    value={formData.productType}
                    onChange={handleSelectChange}
                    allowClear
                  >
                    <Option value='option1'>{i18n.t('register-store.Increase-interaction')}</Option>
                    <Option value='option2'>{i18n.t('register-store.Software-services')}</Option>
                    <Option value='option3'>Blockchain</Option>
                    <Option value='option4'>Email</Option>
                    <Option value='option5'>{i18n.t('register-store.Software')}</Option>
                    <Option value='option6'>{i18n.t('register-store.Account')}</Option>
                  </Select>
                  {errors.productType && <span className='text-danger'>{errors.productType}</span>}
                </div>

                <div>
                  <textarea
                    className={`custom-textarea form-control ${errors.content ? 'is-invalid' : ''}`}
                    placeholder={i18n.t('register-store.Content')}
                    name='content'
                    value={formData.content}
                    onChange={handleChange}
                    required
                  ></textarea>
                  {errors.content && <span className='text-danger'>{errors.content}</span>}
                </div>
              </div>

              <div className='text-center mt-3'>
                <button
                  onClick={handleSubmit}
                  type='button'
                  className='btn btn-primary mb-2 px-4 btn-primary-bg fs-5 button-search-registerStore'
                >
                  {i18n.t('register-store.Register')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterHome />
    </div>
  )
}

export default RegisterStore
