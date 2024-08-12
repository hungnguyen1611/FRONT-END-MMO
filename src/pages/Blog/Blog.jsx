// import Footer from '~/layouts/Footer/Footer'
// import Header from '~/layouts/Header/Header'
// import { useNavigate } from 'react-router-dom'

// import './Blog.css'

// import { useEffect, useState } from 'react'
// import axios from 'axios'
// import { useSelector } from 'react-redux'
// import moment from 'moment'

// const Blog = () => {
//   const navigate = useNavigate()
//   const [data, setData] = useState([])
//   const id_user = useSelector((state) => state.auth._id)

//   useEffect(() => {
//     axios
//       .get(`${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_GET_BLOG}${id_user}`)
//       .then((response) => {
//         console.log('response', response)
//         if (response && response.data) {
//           setData(response?.data?.data)
//         }
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   }, [])
//   console.log(data)
//   return (
//     <div>
//       <Header />
//       <div style={{ minHeight: '60vh' }} className='container my-5'>
//         <h3 className='mb-4'>Bài viết của bạn</h3>
//         <div className='d-flex flex-column mb-3'>
//           <div className='d-flex flex-column flex-md-row justify-content-center mb-3 align-items-center'>
//             <div className='form-group mx-2 mb-3 mb-md-0'>
//               <input
//                 id='blog'
//                 type='text'
//                 placeholder='Tìm bài viết ...'
//                 className='form-control search'
//                 name='code'
//                 // value={formState.code}
//                 // onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className='form-group mx-2 mb-3 mb-md-0'>
//               <select
//                 name='status'
//                 id='status'
//                 className='form-control search'
//                 // value={formState.status}
//                 // onChange={handleChange}
//               >
//                 <option value='default'>-- Tất cả --</option>
//                 <option value='chờ xác nhận'>Hoạt động</option>
//                 <option value='Đang đợi thực hiện'>Khóa</option>
//                 <option value='Tạm giữ tiền'>Chờ duyệt</option>
//               </select>
//             </div>
//             <button type='button' className='btn btn-primary ms-2 my-2'>
//               Tìm kiếm
//             </button>
//             <button onClick={() => navigate('/blog/new')} type='button' className='btn btn-primary ms-2 my-2'>
//               Tạo bài mới
//             </button>
//           </div>
//           <div className='row my-3'>
//             {data.map((post, index) => (
//               <div className='col-12 col-lg-6 fs-6 p-4' key={index}>
//                 <div className=' p-2'>
//                   <div className=''>
//                     <img
//                       src={post?.image}
//                       alt=''
//                       className='img-fluid w-full'
//                       style={{ objectFit: 'cover', maxHeight: '200px', width: '100%' }}
//                     />
//                   </div>
//                   <div className='post-date d-flex mt-2' style={{ color: 'gray', fontSize: '13px' }}>
//                     <a className='post-sale' href=''>
//                       {post?.id_user?.username}
//                     </a>
//                     - <p>{moment(post?.timestamp).format('DD-MM-YYYY HH:mm')}</p>
//                   </div>
//                   <div className='post-name mt-1'>
//                     <a>{post.title}</a>
//                   </div>
//                   {/* <div className='post-content mt-3 fs-6'  dangerouslySetInnerHTML={{ __html: post.post_content }}> </div> */}
//                   <div
//                     dangerouslySetInnerHTML={{ __html: post?.content }}
//                     className='post-content post-content-blog mt-3 fs-6'
//                   ></div>
//                   <div className='my-4'>
//                     {post.isActive === false ? (
//                       <button type='button' className='btn btn-warning me-2'>
//                         Đang chờ duyệt
//                       </button>
//                     ) : (
//                       <button type='button' className='btn btn-buy-detail me-2'>
//                         Đã duyệt
//                       </button>
//                     )}
//                     <button type='button' className='btn btn-light border'>
//                       Cập nhật
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   )
// }

// export default Blog
import Footer from '~/layouts/Footer/Footer'
import FooterHome from '../Home/FooterHome'
import Header from '~/layouts/Header/Header'
import { Link, useNavigate } from 'react-router-dom'

import './Blog.css'

import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { Tooltip, Pagination } from 'antd'
import iconSearch from '../../assets/img/search.png'

const Blog = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [formState, setFormState] = useState('')
  const [status, setStatus] = useState('')
  const [dataPass, setDataPass] = useState([])
  const id_user = useSelector((state) => state?.auth?._id)
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredPosts, setFilteredPosts] = useState([])
  const itemsPerPage = 10 // Số mục trên mỗi trang
  const accessToken = localStorage.getItem('token')

  const [searchTerm, setSearchTerm] = useState('')

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const displayData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_GET_BLOG}${id_user}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token: `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        console.log('response', response)
        if (response && response.data) {
          setData(response?.data?.data)
          setDataPass(response?.data?.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState(value)
  }
  const handleSearch = () => {
    if (formState.trim()) {
      const filtered = dataPass.filter((item) => item.title.toLowerCase().includes(formState.toLowerCase()))
      setData(filtered)
    } else {
      setData(dataPass)
    }
  }
  const handleChangeStatus = (e) => {
    const { value } = e.target
    setStatus(value)

    if (value === 'default') {
      setData(dataPass)
    } else {
      const filtered = dataPass.filter((item) => item.isActive.toString() === value)
      setData(filtered)
    }
  }

  useEffect(() => {
    if (searchTerm === '') {
      setData(dataPass)
    } else {
      const filteredData = data.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()))

      setData(filteredData)
    }
  }, [searchTerm])

  return (
    <div>
      <Header />
      <div style={{ minHeight: '60vh' }} className='container my-5'>
        <h3 className='mb-4'>Bài viết của bạn</h3>
        <div className='d-flex flex-column mb-3'>
          <div className='d-flex flex-column flex-md-row justify-content-center mb-3 align-items-center'>
            {/* <div className='form-group mb-3 mb-md-0'>
              <input
                id='blog'
                type='text'
                placeholder='Tìm bài viết ...'
                className='form-control search'
                name='code'
                value={searchTerm}
                onChange={handleSearchChange}
                // value={formState.code}
                // onChange={handleChange}
                required
              />
            </div> */}
            <div className='share-search d-flex align-items-center'>
              <input
                type='text'
                className='form-control border border-0 flex-grow-1 ms-1'
                placeholder='Tìm bài viết...'
                value={formState}
                onChange={handleChange}
                name='formState'
              />
              <button onClick={handleSearch} className='border-none bg-transparent'>
                <img src={iconSearch} alt='' />
              </button>
            </div>

            <div className='form-group mb-3 mb-md-0 post-block-container ms-md-3'>
              <div className='action-block-row'>
                <select
                  name='status'
                  id='status'
                  className='form-control search post-block-select'
                  value={status}
                  onChange={handleChangeStatus}
                >
                  <option value='default'>-- Tất cả --</option>
                  <option value='true'>Hoạt động</option>
                  <option value='false'>Chờ duyệt</option>
                  <option value='inActive'>Khóa</option>
                </select>
                <button
                  onClick={() => navigate('/blog/new')}
                  type='button'
                  className='btn-primary create-block-button ms-2 my-2'
                >
                  Tạo bài mới
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className='row my-3'>
              {displayData.map((post, index) => (
                <div className='col-12 col-md-6 col-lg-4 fs-6 p-md-4' key={index}>
                  <div className='p-2'>
                    <Link to={`/detailpost/${post?._id}`} className='img-share-block d-block'>
                      <img src={post?.image} alt='' className='img-share-fluid' />
                    </Link>
                    <div className='post-date d-flex mt-2 mb-1' style={{ color: 'gray', fontSize: '13px' }}>
                      <a className='post-sale' href=''>
                        {post?.id_user?.username}
                      </a>
                      - <p>{moment(post?.timestamp).format('DD-MM-YYYY HH:mm')}</p>
                    </div>
                    <div className='post-name post-blog-name'>
                      <a>Tiêu đề: {post?.title}</a>
                    </div>
                    {/* <Tooltip title={post?.content.length > 50 ? post.content : ''}>
                      <div
                        dangerouslySetInnerHTML={{ __html: post?.content }}
                        className={`post-content post-content-blog mt-3 ${post?.content.length > 50 ? 'truncate' : ''}`}
                      ></div>
                    </Tooltip> */}
                    <div
                      className='post-content post-blog-content mt-4 fs-6'
                      dangerouslySetInnerHTML={{ __html: post?.content }}
                    ></div>
                    <div className='my-4 status-block'>
                      {post?.isActive === false ? (
                        <button type='button' className='btn btn-warning me-4'>
                          Đang chờ duyệt
                        </button>
                      ) : (
                        <button type='button' className='btn btn-buy-detail me-2'>
                          Đã duyệt
                        </button>
                      )}
                      <button type='button' className='btn btn-light border'>
                        Cập nhật
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              current={currentPage}
              pageSize={itemsPerPage}
              total={data.length}
              onChange={handlePageChange}
              style={{ display: 'flex', justifyContent: 'center' }}
            />
          </div>
        </div>
      </div>
      <FooterHome />
    </div>
  )
}

export default Blog
