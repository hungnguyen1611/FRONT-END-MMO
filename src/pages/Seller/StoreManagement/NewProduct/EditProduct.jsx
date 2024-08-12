import { Table, notification } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

const EditProduct = ({ id, id_business, productId, onCancel }) => {
  console.log('id_business:', id_business)
  console.log('id:', id)
  console.log('productId:', productId)

  const [data, setData] = useState(null)
  const [product, setProduct] = useState({ name: '', price: '', status: '' })
  const [detailProduct, setDetailProduct] = useState({ name: '', price: '', status: '' })
  const [open, setOpen] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState(null)
  const accessToken = localStorage.getItem('token')

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_BOOTH_BY_BOOTH}?id_business=${id_business}&id_booth=${id}`
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
  }, [id_business, id])
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_DETAIL_BOOTH_BY_ID}?id_business=${id_business}&id_detailBooth=${productId}`
      )
      .then((response) => {
        console.log('response', response)
        if (response && response.data) {
          setDetailProduct(response?.data?.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id_business, id])
  console.log('detail', detailProduct)

  const onSubmit = async (e) => {
    e.preventDefault()

    const body = {
      name: detailProduct.name,
      price: detailProduct.price,
      status: detailProduct.status,
      id_businessType: id_business,
      id_detailBooth: productId
    }

    if (product.quantity !== '') {
      body.quantity = product.quantity
    }

    console.log('Request body:', body)

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_UPDATE_DETAIL_BOOTH}`,
        body,
        {
          headers: {
            // 'Content-Type': 'multipart/form-data',
            token: `Bearer ${accessToken}`
          }
        },
        setTimeout(() => {
          onCancel()
        }, 2000)
      )
      console.log('res', res)
      notification.success({
        message: 'Sửa sản phẩm thành công.',
        duration: 2
      })
    } catch (error) {
      console.log(error)
      notification.error({
        message: 'Lỗi vui lòng xem lại kết nối.',
        duration: 2
      })
    }
  }

  // const handleChange = (e) => {
  //   const { name, value } = e.target
  //   setDetailProduct({ ...detailProduct, [name]: value })
  // }
  const handleChange = (e) => {
    const { name, value } = e.target
    let finalValue = value
    if (name === 'status') {
      finalValue = value === 'true'
    }
    setDetailProduct({ ...detailProduct, [name]: finalValue })
  }

  console.log('data', data)

  return (
    <div>
      <h4>Chỉnh sửa mặt hàng</h4>
      <div className='d-flex align-items-center my-2'>
        <h6>Gian hàng: </h6>
        <h6 style={{ color: 'var(--primary-color)' }} className='mx-2'>
          {data?.id_businessType?.nameBusiness}
        </h6>{' '}
        <h6>{data?.nameBooth}</h6>
      </div>
      <form id='newProductForm' onSubmit={onSubmit}>
        <div className='d-flex justify-content-between flex-wrap'>
          <div className='fs-6 mt-3'>
            Tên mặt hàng
            <input
              type='text'
              name='name'
              value={detailProduct.name}
              onChange={handleChange}
              className='form-control rounded-2 border my-2'
              required
            />
          </div>
          <div className='fs-6 mt-3'>
            Giá tiền
            <input
              type='number'
              name='price'
              value={detailProduct.price}
              onChange={handleChange}
              className='form-control rounded-2 border my-2'
              required
            />
          </div>
          <div className='fs-6 mt-3'>
            Trạng thái
            <select
              name='status'
              id='status'
              className='form-control rounded-2 border w-100 my-2'
              onChange={handleChange}
              value={detailProduct.status}
              required
            >
              {/* <option value={detailProduct?.status}>Mặc định</option>
              <option value={true}>Bật</option>
              <option value={false}>Tắt</option> */}
              <option value='true'>Bật</option>
              <option value='false'>Tắt</option>
            </select>
            {/* <input
              type='number'
              name='price'
              value={product.price}
              onChange={handleChange}
              className='form-control rounded-2 border my-2'
              required
            /> */}
          </div>
          {/* {id_business === import.meta.env.VITE_API_URL_API_ID_PRODUCT && (  
            <div className='fs-6 mt-3'>
              Số lượng
              <input
                type='number'
                name='quantity'
                value={product.quantity}
                onChange={handleChange}
                className='form-control rounded-2 border my-2'
                required
              />
            </div>
          )} */}
        </div>
        <button type='submit' className='btn btn-success btn-sm mt-3'>
          Sửa
        </button>
        {id_business === import.meta.env.VITE_API_URL_API_ID_SERVICE && (
          <div className='fs-6'>
            <p style={{ color: 'red' }}>Lưu ý:</p>
            <ul>
              <li style={{ color: 'green' }}>
                Với những dịch vụ có giá cố định (như giá/ lượt like, share, comment...) bạn phải để giá công khai.
              </li>
              <li style={{ color: 'green' }}>
                Nhập vào giá bằng 0 đối với dịch vụ có giá thả thuận (như code tool, đồ họa...), khi khách đặt hàng phải
                nhập vào giá 2 bên đã thỏa thuận.
              </li>
            </ul>
          </div>
        )}
      </form>
    </div>
  )
}

export default EditProduct
