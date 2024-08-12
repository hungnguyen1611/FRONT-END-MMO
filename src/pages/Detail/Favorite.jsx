import { faHeart as faHeartSolid, faL } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Favorite = ({ id_user, id_booth, id_business }) => {
  console.log(id_user, id_booth, id_business)
  const accessToken = localStorage.getItem('token')
  const [isSolid, setIsSolid] = useState(false)
  const [data, setData] = useState([])
  const [count, setCount] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(accessToken)
    // let api = null
    if (isSolid === true) {
      // api = import.meta.env.VITE_API_URL_API_DELETE_FAVORITE
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_DELETE_FAVORITE}`,
          {
            headers: {
              'Content-Type': 'application/json',
              token: `Bearer ${accessToken}`
            },
            data: { id_user, id_booth, id_business }
          }
        )
        console.log(response)
        if (response) {
          setCount(!count)
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      // api = import.meta.env.VITE_API_URL_API_POST_FAVORITE
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_POST_FAVORITE}`,
          {
            id_user,
            id_booth,
            id_business
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
  }
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_FAVORITE_BY_USER}${id_user}`)
      .then((response) => {
        console.log('response123', response)
        if (response && response.data) {
          setData(response?.data?.data)

          const isFavorite = response.data.data.some(
            (item) => item?.id_boothService?._id === id_booth || item?.id_boothProduct?._id === id_booth
          )

          setIsSolid(isFavorite)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [count])
  console.log(data)
  console.log('isSolid', isSolid)
  return (
    <FontAwesomeIcon
      style={{ cursor: 'pointer' }}
      onClick={handleSubmit}
      icon={isSolid ? faHeartSolid : faHeartRegular}
      className='icon-heart'
    />
  )
}

export default Favorite
