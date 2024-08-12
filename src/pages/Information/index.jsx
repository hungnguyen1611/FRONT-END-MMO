import React, { useEffect, useState } from 'react'
import avt from '../../assets/img/avt.jpg'
import imgRm from '../../assets/img/remove.png'
import './index.css'
import Header from '~/layouts/Header/Header'
import Footer from '~/layouts/Footer/Footer'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import FooterHome from '../Home/FooterHome'

function Information() {
  const id_user = useSelector((state) => state.auth._id)
  const [data, setData] = useState([])
  const [balance, setBalance] = useState([])
  const [profile, setProfile] = useState([])
  // const user = JSON.parse(localStorage.getItem('user') || '{}')
  const accessToken = localStorage.getItem('token')
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_USER_BY}${id_user}`, {
        headers: {
          'Content-Type': 'application/json',
          token: `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        if (response && response.data) {
          setData(response?.data?.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_BALANCE_BY_ID_USER}${id_user}`,
        {
          headers: {
            'Content-Type': 'application/json',
            token: `Bearer ${accessToken}`
          }
        }
      )
      .then((response) => {
        if (response && response.data) {
          setBalance(response?.data?.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_DETAIL_PROFILE}${id_user}`, {
        headers: {
          'Content-Type': 'application/json',
          token: `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        console.log('response', response)
        if (response && response.data) {
          setProfile(response?.data?.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <div style={{ backgroundColor: '#f5f5f5' }}>
      <Header />
      <div className='container my-5'>
        <div className='row'>
          {/* Column for Profile Information */}
          <div className='col-12 col-lg-3 p-3'>
            <div className='rounded bg-information'>
              <div className='image-info text-center p-3 d-flex flex-column align-items-center'>
                {/* Avatar Image */}
                <div className='avatar-container'>
                  <div className='avatar-content'>
                    <img src={avt} alt='Avatar' />
                  </div>
                </div>
                {/* Level Info */}
                <div className='level-info d-flex justify-content-center align-items-center mt-3'>
                  <p className='level rounded-circle text-white fw-bold px-2 py-2 me-2'>LV 0</p>
                  <div className='divider' style={{ color: '#28A745' }}>
                    online
                  </div>
                </div>
                {/* Username */}
                <h4 className='text-center mt-3'>@{data?.username}</h4>
              </div>
            </div>
            {/* Login History */}
            {/* <div className='border rounded text-center mt-3'>Lịch sử đăng nhập</div> */}
          </div>

          {/* Column for Account Information */}
          <div className='col-12 col-lg-9 p-3'>
            <div className='p-4 bg-information'>
              <div className='row'>
                {/* Left Column */}
                <div className='col-12 col-lg-6'>
                  <div className='m-3'>
                    <p className='fw-bold'>Email</p>
                    <p style={{ color: '#6c757d' }}>{data?.gmail}</p>
                  </div>
                  <div className='m-3'>
                    <p className='fw-bold'>Họ tên</p>
                    <p style={{ color: '#6c757d' }}>{data?.username}</p>
                  </div>
                  <div className='m-3'>
                    <p className='fw-bold'>Số dư</p>
                    <p style={{ color: '#6c757d' }}>
                      {(balance?.balanceBanking?.balance + balance?.balanceWeb3?.balance).toLocaleString() === 'NaN'
                        ? 0
                        : (balance?.balanceBanking?.balance + balance?.balanceWeb3?.balance).toLocaleString()}{' '}
                      VND
                    </p>
                  </div>
                  <div className='m-3'>
                    <p className='fw-bold'>Ngày đăng ký</p>
                    <p style={{ color: '#6c757d' }}>{moment(data?.createdAt).format('DD-MM-YYYY HH:mm')}</p>
                    {/* <p>{moment(a?.createdAt).format('DD-MM-YYYY HH:mm')}</p> */}
                  </div>
                </div>

                {/* Right Column */}
                <div className='col-12 col-lg-6'>
                  <div className='m-3'>
                    <p className='fw-bold'>Đã mua</p>
                    <p style={{ color: '#6c757d' }}>{profile?.order || 0} lần</p>
                  </div>
                  <div className='m-3'>
                    <p className='fw-bold'>Số gian hàng</p>
                    <p style={{ color: '#6c757d' }}>{profile?.booth || 0} gian hàng</p>
                  </div>
                  <div className='m-3'>
                    <p className='fw-bold'>Đã bán</p>
                    <p style={{ color: '#6c757d' }}>{profile?.soldBooth || 0} đơn hàng</p>
                  </div>
                  <div className='m-3'>
                    <p className='fw-bold'>Số bài viết</p>
                    <p style={{ color: '#6c757d' }}>{profile?.blog || 0} bài viết</p>
                  </div>
                </div>

                {/* Additional Information */}
                {/* <div className='col-12'>
                  <div className='m-3 d-flex align-items-center'>
                    <div className='fw-bold me-2'>Mua hàng bằng API:</div>
                    <img src={imgRm} alt='' width={16} height={16} className='me-2' />
                    <p style={{ color: 'red', marginBottom: '0' }}>Tắt</p>
                  </div>
                  <div className='m-3 d-flex align-items-center'>
                    <div className='fw-bold me-2'>Bảo mật 2 lớp:</div>
                    <img src={imgRm} alt='' width={16} height={16} className='me-2' />
                    <p style={{ color: 'red', marginBottom: '0' }}>Chưa bật</p>
                  </div>
                  <p className='fs-6 text-success m-3'>(Hãy bảo vệ tài khoản của bạn bằng bảo mật 2FA)</p>
                  <div className='m-3 d-flex align-items-center'>
                    <div className='fw-bold me-2'>Kết nối Telegram:</div>
                    <img src={imgRm} alt='' width={16} height={16} className='me-2' />
                    <p style={{ color: 'red', marginBottom: '0' }}>Chưa kết nối</p>
                  </div>
                  <p className='fs-6 text-success m-3'>(Bạn có thể gửi và nhận được tin nhắn mới qua Telegram)</p>
                </div> */}
              </div>
              <div className='text-center mt-4 '>
                <button onClick={() => navigate('/change/password')} type='button' className='btn btn-edit'>
                  Đổi mật khẩu
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

export default Information
