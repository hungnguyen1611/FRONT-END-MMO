import success from '~/assets/img/success.png'
import LazyImage from '~/hooks/LazyImage/LazyImage'
import { useNavigate } from 'react-router-dom'
import { notification } from 'antd'
import axios from 'axios'
const ModalDetail = ({ cancel, id_business, id_order }) => {
  const accessToken = localStorage.getItem('token')
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    console.log(id_order)
    console.log(accessToken)
    e.preventDefault()
    let api = null
    if (id_business === import.meta.env.VITE_API_URL_API_ID_PRODUCT) {
      api = import.meta.env.VITE_API_URL_API_ORDER_PRODUCT_UPDATE_APPROVED
    } else {
      api = import.meta.env.VITE_API_URL_API_ORDER_SERVICE_UPDATE_APPROVED
    }
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${api}${id_order}`,
        {},
        {
          headers: {
            // 'Content-Type': 'multipart/form-data',
            token: `Bearer ${accessToken}`
          }
        }
      )
      console.log('res', res)
      notification.success({
        message: 'Chấp nhận đơn hàng thành công.',
        duration: 2
      })
      setTimeout(() => {
        navigate(`/store/${id_business}/confirm/${id_order}`)
      }, 2000)
    } catch (error) {
      notification.error({
        message: 'Chấp nhận đơn hàng thất bại.',
        duration: 2
      })
      console.log(error)
    }
  }
  console.log(id_order)
  return (
    <div className='d-flex flex-column align-items-center'>
      <LazyImage className='wrap-image-detail-service mb-3' src={success} alt='face' />
      <h3>Chấp nhận đơn hàng</h3>
      <div className='d-flex'>
        <button onClick={handleSubmit} type='button' className='btn btn-primary search-order my-3'>
          Chấp nhận
        </button>
        <button onClick={() => cancel()} type='button' className='btn btn-primary btn-primary-blue my-3 ms-3'>
          Hủy
        </button>
      </div>
    </div>
  )
}

export default ModalDetail
