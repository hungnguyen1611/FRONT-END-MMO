import React, { useEffect, useState } from 'react'
import avt from '../../assets/img/avt.jpg'
import imgRm from '../../assets/img/remove.png'
// import './index.css'
import Header from '~/layouts/Header/Header'
import Footer from '~/layouts/Footer/Footer'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import Content from '../Product/Content'

function BoothUser() {
  // const id_user = useSelector((state) => state.auth._id)
  const { id_user } = useParams()
  const [data, setData] = useState([])
  const [balance, setBalance] = useState([])
  const [profile, setProfile] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_BOOTH_USER}${id_user}`)
      .then((response) => {
        if (response && response.data) {
          const combinedData = response.data.data.flat() // Hoặc dùng flat để làm phẳng mảng
          let filteredData = combinedData.filter((item) => item.statusBooth === 'Approved')
          console.log('response', response)
          setData(filteredData)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id_user])
  // useEffect(() => {
  //   axios
  //     .get(
  //       `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_BALANCE_BY_ID_USER}${id_user}`
  //     )
  //     .then((response) => {
  //       if (response && response.data) {
  //         setBalance(response?.data?.data)
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }, [])
  // useEffect(() => {
  //   axios
  //     .get(`${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_DETAIL_PROFILE}${id_user}`)
  //     .then((response) => {
  //       console.log('response', response)
  //       if (response && response.data) {
  //         setProfile(response?.data?.data)
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }, [])
  console.log(data)
  console.log(id_user)
  return (
    <div>
      <Header />
      <div className='container my-5'>
        <div className='row'>
          {/* Column for Profile Information */}
          <div className='col-12 col-lg-3 p-3'>
            <div className='rounded border'>
              <div className='image-info text-center p-3 d-flex flex-column align-items-center'>
                {/* Avatar Image */}
                <div className='avatar-container'>
                  <div className='avatar-content'>
                    <img src={avt} alt='Avatar' />
                  </div>
                </div>
                {/* Level Info */}
                {/* <div className='level-info d-flex justify-content-center align-items-center mt-3'>
                  <p className='level rounded-circle text-white fw-bold px-2 py-2 me-2 border border-dark'>LV 0</p>
                  <div className='divider' style={{ color: 'green' }}>
                    online
                  </div>
                </div> */}
                {/* Username */}
                <h4 className='text-center mt-3'>@{data[0]?.id_user?.username}</h4>
              </div>
            </div>
            {/* Login History */}
            {/* <div className='border rounded text-center mt-3'>Lịch sử đăng nhập</div> */}
          </div>

          {/* Column for Account Information */}
          <div className='col-12 col-lg-9 p-3'>
            <div className='row'>
              {Array.isArray(data) && data.length > 0 ? (
                data.map((da, i) => (
                  <div key={i} className='col-12 col-xl-6 mb-3'>
                    <Content product={da} />
                  </div>
                ))
              ) : (
                <h2>Không có dữ liệu phù hợp</h2>
              )}
            </div>
            {/* <div className='border p-4'>
              <div className='row'> 
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
                    <p className='fw-bold'>Ngày tham gia</p>
                    <p style={{ color: '#6c757d' }}>{moment(data?.createdAt).format('DD-MM-YYYY HH:mm')}</p> 
                  </div>
                </div> 
                <div className='col-12 col-lg-6'> 
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
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default BoothUser
