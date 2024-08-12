import { notification } from 'antd'
import axios from 'axios'

const DeleteProduct = ({ id, id_business, productId, handleCancel }) => {
  console.log('idDelete', id)
  console.log('id_businessDelete', id_business)
  console.log('productid', productId)
  const accessToken = localStorage.getItem('token')

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(id, id_business, productId)
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_DELETE_DETAIL_BOOTH}`,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            token: `Bearer ${accessToken}`
          },
          data: {
            id_booth: id,
            id_business: id_business,
            id_detailBooth: productId
          }
        }
      )
      console.log(response)
      if (response.data.success) {
        notification.success({
          message: 'Xóa sản phẩm thành công.',
          duration: 2
        })
        setTimeout(() => {
          handleCancel()
        }, 2000)
      } else {
        notification.error({
          message: 'Xóa sản phẩm thất bại.',
          description: response.data.message,
          duration: 2
        })
      }
    } catch (error) {
      console.error(error)
      notification.error({
        message: 'Xóa sản phẩm thất bại.',
        duration: 2
      })
    }
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   try {
  //     const response = await axios.delete(
  //       `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_DELETE_DETAIL_BOOTH}`,
  //       {
  //         data: {
  //           id_booth: id,
  //           id_business: id_business,
  //           id_detailBooth: productId
  //         }
  //       }
  //     )
  //     console.log(response)
  //     notification.success({
  //       message: 'Xóa sản phẩm thành công.',
  //       duration: 2
  //     })
  //   } catch (error) {
  //     console.error(error)
  //     notification.error({
  //       message: 'Xóa sản phẩm thất bại.',
  //       duration: 2
  //     })
  //   }
  // }
  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   try {
  //     const response = await axios.delete(
  //       `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_DELETE_BOOTH}`,
  //       {
  //         id_booth: id,
  //         id_business: id_business
  //       }
  //     )
  //     console.log(response)
  //     notification.success({
  //       message: 'Xóa gian hàng thành công.',
  //       duration: 2
  //     })
  //   } catch (error) {
  //     console.error(error)
  //     notification.success({
  //       message: 'Xóa gian hàng Thất bại.',
  //       duration: 2
  //     })
  //   }
  // }
  return (
    <div>
      <h1 className='text-center'>Bạn có muốn xóa sản phẩm này không!</h1>
      <div className='text-center'>
        <button
          type='button'
          onClick={handleCancel}
          // className='btn btn-primary btn-primary-blue my-3 ms-3'
          className={'btn-primary-blue  btn btn-primary my-3'}
        >
          Thoát
        </button>
        <button
          type='button'
          onClick={handleSubmit}
          // className=`${count === 0 ? 'btn-primary-bg' : ''}${btn btn-primary my-3}`
          className={'btn-primary-bg  btn btn-primary my-3 ms-3'}
        >
          Đồng ý
        </button>
      </div>
    </div>
  )
}

export default DeleteProduct
