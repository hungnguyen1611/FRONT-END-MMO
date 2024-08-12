import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link, useNavigate } from 'react-router-dom'
import { Pagination } from 'antd'
import Header from '~/layouts/Header/Header'
import FooterHome from '../Home/FooterHome'
import './Share.css'
import iconSearch from '../../assets/img/search.png'

const Share = () => {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  const accessToken = localStorage.getItem('token')

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_ALL_ACTIVE}`, {
        headers: {
          // 'Content-Type': 'multipart/form-data',
          token: `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        if (response?.data) {
          setPosts(response?.data)
          setFilteredPosts(response?.data)
          console.log(response?.data)
        }
      })
      .catch((err) => console.error('Error fetching posts:', err))
  }, [])

  const handleSearch = () => {
    const lowercasedFilter = searchTerm.toLowerCase()
    const filteredData = posts.filter((post) => post?.title?.toLowerCase()?.includes(lowercasedFilter))
    setFilteredPosts(filteredData)
  }

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handlePageChange = (page, size) => {
    setCurrentPage(page)
    setPageSize(size)
  }

  const handleCategoryClick = (category) => {
    setCurrentPage(1)
    setFilteredPosts(category === '' ? posts : posts.filter((post) => post?.category?.name === category))
  }

  const paginatedPosts = filteredPosts.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  return (
    <div className='background-total'>
      <Header />
      <div className='container'>
        <nav aria-label='breadcrumb'>
          <ol className='breadcrumb py-0'>
            <li className='breadcrumb-item'>
              <Link to='/'>Home</Link>
            </li>
            <li className='breadcrumb-item active' aria-current='page'>
              Share
            </li>
          </ol>
        </nav>

        <div style={{ backgroundColor: '#fff' }} className='container container-share pt-2'>
          <div className='mt-5 text-center'>
            <h1 className='heading-share py-3'>Kinh nghiệm MMO</h1>
            <p className='fs-6 py-3'>Nơi chia sẻ kiến thức, kinh nghiệm, và trải nghiệm về kiếm tiền online.</p>
          </div>

          <div className='p-1 categorys'>
            <div className='d-flex align-items-center justify-content-between mb-3'>
              <h4 className='p-3 mb-0 w-100'>Thể loại</h4>
              <button
                onClick={() => navigate('/blog')}
                type='button'
                className='btn-primary btn-manage-articles ms-2 my-2 d-none d-md-block w-50 py-3'
              >
                Quản lý bài viết
              </button>
            </div>

            <button
              onClick={() => navigate('/blog')}
              type='button'
              className='btn-primary create-block-button ms-2 my-2 d-block d-md-none'
            >
              Bài viết
            </button>

            <ul className='list-unstyled px-3 d-flex align-items-center justify-content-center flex-wrap'>
              <li className='li-mana my-2'>
                <a href='#' className='fw-normal item-unstyled' onClick={() => handleCategoryClick('')}>
                  Tất cả bài viết
                </a>
              </li>
              <li className='li-mana my-2'>
                <a href='#' className='fw-normal item-unstyled' onClick={() => handleCategoryClick('Marketing')}>
                  Marketing
                </a>
              </li>
              <li className='li-mana my-2'>
                <a href='#' className='fw-normal item-unstyled' onClick={() => handleCategoryClick('Youtube')}>
                  Youtube
                </a>
              </li>
              <li className='li-mana my-2'>
                <a href='#' className='fw-normal item-unstyled' onClick={() => handleCategoryClick('Airdrop')}>
                  Airdrop
                </a>
              </li>
              <li className='li-mana my-2'>
                <a href='#' className='fw-normal item-unstyled' onClick={() => handleCategoryClick('Blockchain')}>
                  Blockchain
                </a>
              </li>
              <li className='li-mana'>
                <a href='#' className='fw-normal item-unstyled' onClick={() => handleCategoryClick('Nội dung khác')}>
                  Nội dung khác
                </a>
              </li>
              <li className='li-mana'>
                <a href='#' className='fw-normal item-unstyled' onClick={() => handleCategoryClick('Tạp hóa MMO')}>
                  Tạp hóa MMO
                </a>
              </li>
              <li className='li-mana'>
                <a href='#' className='fw-normal item-unstyled' onClick={() => handleCategoryClick('Zalo')}>
                  Zalo
                </a>
              </li>
              <li className='li-mana'>
                <a href='#' className='fw-normal item-unstyled' onClick={() => handleCategoryClick('Tiktok')}>
                  Tiktok
                </a>
              </li>
            </ul>
          </div>

          <div className='share-content'>
            <div className='row'>
              <div className='share-category col-12 col-lg-4 p-3'>
                <div className='share-search w-100 d-flex align-items-center'>
                  <input
                    type='text'
                    className='form-control border border-0 flex-grow-1 ms-1 search-input-share'
                    placeholder='Tìm bài viết...'
                    value={searchTerm}
                    onChange={handleChange}
                  />
                  <button onClick={handleSearch} className='border-none bg-transparent'>
                    <img src={iconSearch} alt='Search Icon' />
                  </button>
                </div>
              </div>
              <div className='share-post col-12 col-lg-8'>
                <div className='post-list-view d-flex flex-wrap'>
                  {paginatedPosts.map((post, index) => (
                    <div className='col-lg-6 col-md-6 col-12 mb-5' key={index}>
                      <div className='post-item p-3'>
                        <div className='post-image post-blog-image'>
                          <Link to={`/detailpost/${post._id}`}>
                            <img
                              src={post.image}
                              alt='Post'
                              className='img-fluid w-full'
                              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                            />
                          </Link>
                        </div>
                        <div className='post-info'>
                          <div className='post-date d-flex mt-3'>
                            <Link className='post-user-blog me-1 fs-6' to={`/booth/user/${post.id_user?._id}`}>
                              {post.id_user?.username}
                            </Link>
                            - <p className='ms-1 fs-6'>{moment(post.timestamp).format('DD-MM-YYYY HH:mm')}</p>
                          </div>
                          <div className='post-name post-blog-name'>
                            <a>Tiêu đề: {post.title}</a>
                          </div>
                          <div
                            className='post-content post-blog-content'
                            dangerouslySetInnerHTML={{ __html: post.content }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className='text-center'>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              onChange={handlePageChange}
              total={filteredPosts.length}
              showSizeChanger
              pageSizeOptions={['10', '20', '30']}
            />
          </div>
        </div>
        <FooterHome />
      </div>
    </div>
  )
}

export default Share
