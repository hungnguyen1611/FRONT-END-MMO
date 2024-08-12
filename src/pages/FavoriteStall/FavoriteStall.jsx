import Footer from '~/layouts/Footer/Footer'
import Header from '~/layouts/Header/Header'
import Content from '../Product/Content'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import ContentFavorite from './ContentFavorite'
import { faL } from '@fortawesome/free-solid-svg-icons'

const FavoriteStall = () => {
  const id_user = useSelector((state) => state.auth._id)
  const accessToken = localStorage.getItem('token')
  const [data, setData] = useState([])
  const [count, setCount] = useState(faL)
  // const user = JSON.parse(localStorage.getItem('user') || '{}')
  // const accessToken = user.token

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_FAVORITE_BY_USER}${id_user}`,
        {
          headers: {
            'Content-Type': 'application/json',
            token: `Bearer ${accessToken}`
          }
        }
      )
      .then((response) => {
        console.log('response', response)
        if (response && response.data) {
          setData(response?.data?.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [count])
  const handleSubmit = async (id_booth, id_business) => {
    // e.preventDefault()
    // let api = null

    // api = import.meta.env.VITE_API_URL_API_DELETE_FAVORITE
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_DELETE_FAVORITE}`,
        {
          data: { id_user, id_booth, id_business }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            token: `Bearer ${accessToken}`
          }
        }
      )
      console.log(response)
      if (response) {
        setCount(!count)
      }
    } catch (error) {
      console.log(error)
    }
  }
  console.log(data)

  return (
    <div>
      <Header />
      <div style={{ minHeight: '60vh' }} className='container my-5'>
        <h3 className='mb-4'>GIAN HÀNG YÊU THÍCH</h3>
        {Array.isArray(data) && data.length > 0 ? (
          data.map((dat, i) => (
            <div key={i} className='d-flex flex-column mb-3'>
              <div className='d-flex flex-row-reverse'>
                <button
                  onClick={() =>
                    handleSubmit(
                      dat?.id_boothService?._id || dat?.id_boothProduct?._id,
                      dat?.id_boothService?.id_businessType || dat?.id_boothProduct?.id_businessType
                    )
                  }
                  type='button'
                  className='btn btn-primary btn-primary-bg'
                >
                  Hủy yêu thích
                </button>
              </div>
              <ContentFavorite dat={dat} />
            </div>
          ))
        ) : (
          <h4>Bạn chưa yêu thích gian hàng nào!</h4>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default FavoriteStall
