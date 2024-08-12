import React, { useEffect, useState } from 'react'
import './index.css'
// import posts from '../Share/data'

import imgPost1 from '../../assets/img/cach-a-facebook-dang-956-phone-sang-dang-956-mail_866913.png'
import { Link, useParams } from 'react-router-dom'

import iconView from '../../assets/img/view.png'
import iconLike from '../../assets/img/like.png'
import iconChat from '../../assets/img/chat.png'
import avt from '../../assets/img/avt.jpg'
import Header from '~/layouts/Header/Header'
import Footer from '~/layouts/Footer/Footer'
import axios from 'axios'
import moment from 'moment'
import LazyImage from '~/hooks/LazyImage/LazyImage'
import Describe from '../Detail/Describe'
import SimilarPost from '../Detail/SimilarPost'
import DetailSimilarPost from '../Detail/DetailSimilarPost'
import FooterHome from '../Home/FooterHome'

function DetailPost() {
  const [posts, setPosts] = useState([])
  const { id_post } = useParams()
  const [postsSell, setPostsSell] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const { id_business, id_booth } = useParams()
  const [data, setData] = useState([])

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_DETAIL_BLOG}${id_post}`)
      .then((response) => {
        if (response && response.data) {
          setPosts(response?.data?.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id_post])

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_ALL_ACTIVE}`)
      .then((response) => {
        console.log('response', response)
        if (response && response?.data) {
          setPostsSell(response?.data)
          setFilteredPosts(response?.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_BOOTH_BY_BOOTH}?id_business=${id_business}&id_booth=${id_booth}`
        )

        if (response && response.data) {
          const data = response?.data?.data
          // setData(data)
        }
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [id_business, id_booth])

  return (
    <div style={{ backgroundColor: '#F5F5F5' }}>
      <Header />

      <div className='detailpost'>
        <div className='container'>
          <nav aria-label='breadcrumb'>
            <ol className='breadcrumb'>
              <li className='breadcrumb-item'>
                <Link to={'/'}>Home</Link>
              </li>
              <li className='breadcrumb-item'>
                <Link to='/share'>Share </Link>
              </li>
              <li className='breadcrumb-item'>
                <Link to=''>{posts?.title}</Link>
              </li>
              {/* <li className='breadcrumb-item active' aria-current='page'>
              {data?.nameBooth}
            </li> */}
            </ol>
          </nav>

          <div className='row postInfor'>
            <div className='col-12'>
              <div className='mt-5 text-center'>
                <h1 className='fs-2 fw-bold lh-1' style={{ color: '#3d464d' }}>
                  {posts?.title}
                </h1>
                <div className='d-flex gap-2 flex-wrap author-information'>
                  <div className=''>
                    Viết bởi:{' '}
                    <Link className='author-blog-detail' to={`/booth/user/${posts?.id_user?._id}`}>
                      {posts?.id_user?.username}
                    </Link>
                  </div>
                  <li></li>
                  <div className=''>
                    <p>{moment(posts?.timestamp).format('DD-MM-YYYY HH:mm')}</p>
                  </div>
                </div>
              </div>
              <div className='text-center'>
                <LazyImage src={posts?.image} alt='Post 1' className='img-fluid my-3 img-detailpost ' />
              </div>
              <div className='contentPost' dangerouslySetInnerHTML={{ __html: posts?.content }}></div>
            </div>
            <div style={{ padding: '20px' }}>
              <SimilarPost
                name_type={filteredPosts?.id_boothType?.nameBoothTypeLowerCase}
                name_business={filteredPosts?.id_businessType?.nameBusinessLowerCase}
                category={posts?.category}
              />
            </div>
          </div>

          {/* <DetailSimilarPost
            desc={filteredPosts?.desc}
            _id={filteredPosts?._id}
            id_businessType={filteredPosts?.id_businessType?._id}
          /> */}
        </div>
      </div>
      <FooterHome />
    </div>
  )
}

export default DetailPost
