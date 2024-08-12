import { faClock, faEnvelope, faFaceGrinSquintTears } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import Footer from '~/layouts/Footer/Footer'
import FooterHome from '../Home/FooterHome'
import Header from '~/layouts/Header/Header'
import './Support.css'
import { notification } from 'antd'
import axios from 'axios'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const Support = () => {
  const { i18n } = useTranslation()

  const [product, setProduct] = useState({ email: '', sdt: '', topic: '', content: '' })
  const [errors, setErrors] = useState({})
  const accessToken = localStorage.getItem('token')

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }

  const validateForm = () => {
    const newErrors = {}
    if (!product.email) newErrors.email = 'Thông tin này không thể bỏ trống'
    if (!product.sdt) newErrors.sdt = 'Thông tin này không thể bỏ trống'
    if (!product.topic) newErrors.topic = 'Thông tin này không thể bỏ trống'
    if (!product.content) newErrors.content = 'Thông tin này không thể bỏ trống'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      const body = {
        email: product.email,
        sdt: product.sdt,
        topic: product.topic,
        content: product.content
      }
      console.log('Request body:', body)
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_SAVE_CONTACT}`,
          body,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              token: `Bearer ${accessToken}`
            }
          }
        )
        notification.success({ message: 'Gửi hỗ trợ thành công!', description: res.data.message })
      } catch (error) {
        console.error(error)
        notification.error({ message: 'Gửi hỗ trợ thất bại!', description: error.message })
      }
    }
  }

  return (
    <div>
      <Header />
      <div className='Support-background'>
        <div className='container py-5'>
          <div className='row wrap-support p-3'>
            <div className='d-flex flex-column col-12 col-md-6 title-support d-flex flex-column align-items-center justify-content-center'>
              {/* <h3 className='mb-3'>Liên hệ hỗ trợ</h3>
            <Link className='footer-item-link mb-3' to='/'>
              <FontAwesomeIcon icon={faFaceGrinSquintTears} /> Tạp hóa MMO
            </Link>
            <Link className='footer-item-link mb-3' to='mailto:someone@example.com'>
              <FontAwesomeIcon icon={faEnvelope} /> support@taphoammo.net
            </Link>
            <div className='mb-3'>
              <FontAwesomeIcon icon={faClock} /> Mon-Sat 08:00am - 10:00pm
            </div> */}
              <p style={{ lineHeight: '1.3' }}>
                {i18n.t('support.We-staff')} <br />
                <p className='mt-3' style={{ color: '#28a745' }}>
                  {' '}
                  {i18n.t('support.We-staff')}
                </p>
              </p>
            </div>
            <div className='col-12 col-md-5 mt-4 mt-md-0 infor-store py-4 px-4'>
              {/* <h3 className='mb-3'>Tin nhắn</h3> */}
              <div onSubmit={onSubmit} className='form-group mt-3 form-registerStore'>
                {/* <label className='form-label' htmlFor='email'>
                  Email
                </label> */}
                <div>
                  <input
                    id='email'
                    type='email'
                    placeholder={i18n.t('support.Enter-email')}
                    className={`form-control input-support ${errors.email ? 'is-invalid' : ''}`}
                    name='email'
                    value={product.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && <span className='text-danger'>{errors.email}</span>}
                </div>

                <div className='contact-store'>
                  {/* <label className='form-label' htmlFor='numberphone'>
                  Số điện thoại
                </label> */}

                  <div className='w-50'>
                    <input
                      id='sdt'
                      type='text'
                      placeholder={i18n.t('support.Enter-phone')}
                      className={`form-control input-support ${errors.sdt ? 'is-invalid' : ''}`}
                      name='sdt'
                      value={product.sdt}
                      onChange={handleChange}
                      required
                    />
                    {errors.sdt && <span className='text-danger'>{errors.sdt}</span>}
                  </div>

                  {/* <label className='form-label' htmlFor='topic'>
                  Chủ đề
                </label> */}

                  <div className='w-50'>
                    <input
                      id='topic'
                      type='text'
                      placeholder={i18n.t('support.Enter-topic')}
                      className={`form-control input-support ${errors.topic ? 'is-invalid' : ''}`}
                      name='topic'
                      value={product.topic}
                      onChange={handleChange}
                      required
                    />

                    {errors.topic && <span className='text-danger'>{errors.topic}</span>}
                  </div>
                </div>

                {/* <label className='form-label' htmlFor='content'>
                  Nội dung
                </label> */}

                <div>
                  <textarea
                    id='content'
                    placeholder={i18n.t('support.Enter-content')}
                    className={`form-control ${errors.content ? 'is-invalid' : ''}`}
                    rows={1} // Số hàng tối thiểu hiển thị ban đầu
                    wrap='hard'
                    style={{ height: '150px' }}
                    name='content'
                    value={product.content}
                    onChange={handleChange}
                    required
                  />
                  {errors.content && <span className='text-danger'>{errors.content}</span>}
                </div>

                <div className='text-center mt-3'>
                  <button onClick={onSubmit} className='button-search-registerStore btn btn-primary px-5'>
                    {i18n.t('support.Send')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterHome />
    </div>
  )
}

export default Support
