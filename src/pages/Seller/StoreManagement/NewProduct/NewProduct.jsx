// import { Table } from 'antd'
// import axios from 'axios'
// import { useEffect, useState } from 'react'
// import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

// const NewProduct = ({ id, id_business }) => {
//   console.log('id1', id_business)
//   const [data, setData] = useState([])
//   const [product, setProduct] = useState({ name: '', price: '', quantity: '' })
//   const [active, setActive] = useState(false)
//   useEffect(() => {
//     axios
//       .get(
//         `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_BOOTH_BY_BOOTH}?id_business=${id_business}&id_booth=${id}`
//       )
//       .then((respone) => {
//         console.log('respone', respone)
//         if (respone && respone.data) {
//           setData(respone?.data?.data?.detailBooth || [])
//         }
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   }, [active])
//   const onSubmit = async (e) => {
//     e.preventDefault()
//     const formData = new FormData()
//     formData.append('name', product.name)
//     formData.append('price', product.price)
//     formData.append('id_business', id_business)
//     formData.append('id_booth', id)
//     if (product.quantity !== '') {
//       formData.append('quantity', product.quantity)
//     }
//     formData.forEach((value, key) => {
//       console.log(key, value)
//     })
//     setActive(!active)
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_DETAIL_BOOTH}`,
//         formData
//       )
//       if (res) {
//       }
//       console.log('res', res)
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setProduct({ ...product, [name]: value })
//   }
//   const rederAction = (categoryId) => {
//     return (
//       <div style={{ display: 'flex' }}>
//         <EditOutlined
//           onClick={() => {
//             // setSelectedProductId(categoryId);
//             // setOpen(true);
//             console.log(categoryId)
//           }}
//           style={{
//             color: 'orange',
//             fontSize: '20px',
//             cursor: 'pointer',
//             marginRight: '10px'
//           }}
//         />
//         <DeleteOutlined
//           onClick={() => {
//             // setSelectedProductId(categoryId);
//             // setDele(true);
//             console.log(categoryId)
//           }}
//           style={{ color: 'red', fontSize: '20px', cursor: 'pointer' }}
//         />
//       </div>
//     )
//   }
//   const colurm = [
//     {
//       key: '1',
//       title: 'Tên mặt hàng',
//       dataIndex: 'name',
//       render: (name) => <>{name?.name}</>
//     },
//     {
//       key: '2',
//       title: 'Giá',
//       dataIndex: 'price',
//       render: (price) => <>{price?.price}</>
//     },
//     {
//       key: '3',
//       title: 'Trạng thái',
//       dataIndex: 'status',
//       render: (status) => <>{status?.status}</>
//     },
//     {
//       key: '4',
//       title: 'Tồn kho',
//       dataIndex: 'quality',
//       render: (status) => <>{status?.quantity - status?.countQuantity || 0}</>
//     },
//     {
//       key: '5',
//       title: 'Thao tác',
//       dataIndex: 'sl',
//       render: (text, record) => rederAction(record._id)
//     }
//   ]
//   console.log('data', data)
//   return (
//     <div>
//       <h4>Quản lý mặt hàng</h4>
//       <div className='d-flex align-items-center my-2'>
//         <h6>Gian hàng: </h6>
//         <span style={{ color: 'var(--primary-color)' }} className='mx-2'>
//           {data?.id_businessType?.nameBusiness}
//         </span>{' '}
//         <h6>{data?.nameBooth}</h6>
//       </div>
//       <Table className='table-pur' dataSource={data} columns={colurm} />
//       <form id='newProductForm' onSubmit={onSubmit}>
//         <div className='d-flex justify-content-between flex-wrap'>
//           <div className='fs-6 mt-3'>
//             Tên mặt hàng
//             <input
//               type='text'
//               name='name'
//               value={product.name}
//               onChange={handleChange}
//               className='form-control rounded-2 border my-2'
//               required
//             />
//           </div>
//           <div className='fs-6 mt-3'>
//             Giá tiền
//             <input
//               type='number'
//               name='price'
//               value={product.price}
//               onChange={handleChange}
//               className='form-control rounded-2 border my-2'
//               required
//             />
//           </div>
//           {data?.id_businessType?.nameBusiness === 'Sản phẩm' ? (
//             <div className='fs-6 mt-3'>
//               Số lượng
//               <input
//                 type='number'
//                 name='quantity'
//                 value={product.quantity}
//                 onChange={handleChange}
//                 className='form-control rounded-2 border my-2'
//                 required
//               />
//             </div>
//           ) : (
//             <></>
//           )}
//         </div>
//         <button type='submit' className='btn btn-success btn-sm mt-3'>
//           Thêm
//         </button>
//       </form>
//     </div>
//   )
// }

// export default NewProduct

import { Modal, Table } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import EditProduct from './EditProduct'
import DeleteProduct from './DeleteProduct'

const NewProduct = ({ id, id_business }) => {
  console.log('id_business:', id_business)
  console.log('id:', id)
  const accessToken = localStorage.getItem('token')
  const [data, setData] = useState([])
  const [booth, setBooth] = useState(null)
  const [product, setProduct] = useState({ name: '', price: '', quantity: '' })
  const [active, setActive] = useState(false)
  const [open, setOpen] = useState(false)
  const [openDe, setOpenDe] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [selectedDeleteId, setSelectedDeleteId] = useState(null)

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_BOOTH_BY_BOOTH}?id_business=${id_business}&id_booth=${id}`
      )
      .then((response) => {
        console.log('response', response)
        if (response && response.data) {
          setData(response?.data?.data?.detailBooth || [])
          setBooth(response?.data?.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [active, id_business, id, openDe, open])

  const onSubmit = async (e) => {
    e.preventDefault()

    const body = {
      name: product.name,
      price: product.price,
      id_business: id_business,
      id_booth: id
    }

    if (product.quantity !== '') {
      body.quantity = product.quantity
    }

    console.log('Request body:', body)

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_DETAIL_BOOTH}`,
        body,
        {
          headers: {
            // 'Content-Type': 'multipart/form-data',
            token: `Bearer ${accessToken}`
          }
        }
      )
      if (res) {
        setActive(!active)
      }
      console.log('res', res)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }

  const rederAction = (categoryId) => {
    return (
      <div style={{ display: 'flex' }}>
        <EditOutlined
          onClick={() => {
            setSelectedProductId(categoryId)
            setOpen(true)
            console.log(categoryId)
          }}
          style={{
            color: 'orange',
            fontSize: '20px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        />
        <DeleteOutlined
          onClick={() => {
            console.log(categoryId)
            setSelectedDeleteId(categoryId)
            setOpenDe(true)
          }}
          style={{ color: 'red', fontSize: '20px', cursor: 'pointer' }}
        />
      </div>
    )
  }

  const columns = [
    {
      key: '1',
      title: 'Tên mặt hàng',
      dataIndex: 'name',
      render: (name) => <>{name}</>
    },
    {
      key: '2',
      title: 'Giá',
      dataIndex: 'price',
      render: (price) => <>{price}</>
    },
    {
      key: '3',
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (status) => <>{status ? 'Bật' : 'Tắt'}</>
    },
    {
      key: '4',
      title: 'Tồn kho',
      dataIndex: 'quantity',
      render: (text, record) => <>{record?.quantity - record?.countQuantity || 0} </>
    },
    {
      key: '5',
      title: 'Thao tác',
      dataIndex: 'sl',
      render: (text, record) => rederAction(record._id)
    }
  ]

  console.log('data', data)
  const handleCancel = () => {
    setOpenDe(false)
    setOpen(false)
  }
  return (
    <div>
      <h4>Quản lý mặt hàng</h4>
      <div className='d-flex align-items-center my-2'>
        <h6>Gian hàng: </h6>
        <h6 style={{ color: 'var(--primary-color)' }} className='mx-2'>
          {booth?.id_businessType?.nameBusiness}
        </h6>{' '}
        <h6>{booth?.nameBooth}</h6>
      </div>
      <Table className='table-pur' dataSource={data} columns={columns} />
      <form id='newProductForm' onSubmit={onSubmit}>
        <div className='d-flex justify-content-between flex-wrap'>
          <div className='fs-6 mt-3'>
            Tên mặt hàng
            <input
              type='text'
              name='name'
              value={product.name}
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
              value={product.price}
              onChange={handleChange}
              className='form-control rounded-2 border my-2'
              required
            />
          </div>
          {id_business === import.meta.env.VITE_API_URL_API_ID_PRODUCT && ( // Thay 'ID_BUSINESS_PRODUCT' bằng giá trị thực tế của bạn
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
          )}
        </div>
        <button type='submit' className='btn btn-success btn-sm mt-3'>
          Thêm
        </button>
      </form>
      <Modal
        // title="Thay đổi sản phẩm"
        centered
        open={open}
        footer={null}
        onCancel={handleCancel}
        // width={'100%'}
        // style={{ marginTop: 30 }}
      >
        <EditProduct id={id} id_business={id_business} productId={selectedProductId} onCancel={handleCancel} />
      </Modal>
      <Modal
        // title="Thay đổi sản phẩm"
        centered
        open={openDe}
        footer={null}
        onCancel={handleCancel}
        // width={'100%'}
        // style={{ marginTop: 30 }}
      >
        <DeleteProduct handleCancel={handleCancel} id={id} id_business={id_business} productId={selectedDeleteId} />
      </Modal>
    </div>
  )
}

export default NewProduct
